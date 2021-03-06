import moment from 'moment'
import fs from 'fs'

import createAnalyticsInventory from './actions/create-analytics-inventory.js'
import readData from './actions/read-data.js'

exports.handler = async (event, context, callback) => {
  const respond = ({ status, body }) => {
    callback(null, {
      statusCode: status,
      body: JSON.stringify({ body }),
    })
  }

  if (!callback) {
    var callback = () => {}
  }
  try {
    let sales = JSON.parse(fs.readFileSync('./static/data/sales.json'))
    let items = JSON.parse(fs.readFileSync('./static/data/items.json'))
    let categories = JSON.parse(
      fs.readFileSync('./static/data/categories.json')
    )

    // console.time('Getting data from AWS')
    // let { sales, items, categories } = await readData('all')

    let starburstData = createAnalyticsInventory(sales, items, categories)

    respond({
      status: 200,
      body: { message: 'succes', data: starburstData },
    })
  } catch (err) {
    console.log(err)
    respond({ status: 422, body: err })
  }
}
