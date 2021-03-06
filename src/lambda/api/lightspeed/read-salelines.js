import _ from 'lodash'
import moment from 'moment'
import strictUriEncode from 'strict-uri-encode'
import { asyncify, timesLimit } from 'async'
import { promisify } from 'util'
const ptimesLimit = promisify(timesLimit)

import request from './request-lightspeed.js'
import readAccessToken from '../lightspeed-auth/read-token.js'

export default async ({
  dates = {
    start: moment().startOf('year'),
    end: moment(),
  },
  itemID,
} = {}) => {
  // Encode dates properly
  dates = {
    start: strictUriEncode(
      moment(dates.start)
        .startOf('d')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    ),
    end: strictUriEncode(
      moment(dates.end)
        .endOf('d')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    ),
  }

  // Auth and header config
  let access_token = await readAccessToken()
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }

  let apiUrl = itemID
    ? `https://api.lightspeedapp.com/API/Account/159502/SaleLine.json?timeStamp=><,${
        dates.start
      },${dates.end}&itemID=${parseInt(itemID)}`
    : `https://api.lightspeedapp.com/API/Account/159502/SaleLine.json?timeStamp=><,${
        dates.start
      },${dates.end}`

  // Get saleslines
  let attributes = (await request(apiUrl, options, 1))['@attributes']
  let count = parseInt(attributes.count)
  let limit = parseInt(attributes.limit)
  let saleLines = []

  await ptimesLimit(
    Math.ceil(count / limit),
    10,
    asyncify(async i => {
      let offset = i * limit
      apiUrl = apiUrl + `&offset=${offset}`
      let tempSaleLines = await request(apiUrl, options, 1)
      if (tempSaleLines.SaleLine) {
        saleLines = _.concat(saleLines, tempSaleLines.SaleLine)
      }
    })
  )

  return saleLines.length > 0 && (await saleLines)
}
