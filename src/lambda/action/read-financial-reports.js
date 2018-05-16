import moment from 'moment'
import { asyncify, map } from 'async'
import { promisify } from 'util'
const pmap = promisify(map)

import readSalesDay from '../api/lightspeed/read-salesday.js'
import updateDynamo from '../store/dynamo/salesday/update.js'
import readDynamo from '../store/dynamo/salesday/read.js'
import calculateDayreport from '../transformation/lightspeed-sales--to--dayreport.js'

export default async datesArray => {
  let dayreports = await pmap(
    datesArray,
    asyncify(async (dateObject, key) => {
      // Setup variables
      let date = moment(dateObject.date)
        .startOf('day')
        .format()
      let lsRequested = false
      let salesDay

      // Read from Dynamo
      if (!dateObject.lsRefresh) {
        console.log('Request Dynamo')
        salesDay = await readDynamo(date)
      }

      // When not in Dynamo download from Lightspeed and put in Dynamo
      if (!salesDay || dateObject.lsRefresh) {
        lsRequested = true
        console.log('Request Lightspeed')
        let sales = await readSalesDay(date)
        console.log('Update Dynamo')
        salesDay = await updateDynamo(sales, date)
      }

      // Calculate the dayreport
      console.log('Calculate Dayreturn')
      let dayreport = {
        date: date,
        lsRequested: lsRequested,
        ...calculateDayreport(salesDay),
      }

      return dayreport
    })
  )

  return dayreports
}