import fs from 'fs'

import updateReorderPoints from './actions/update-reorderpoints.js'
import updateData from './actions/update-data.js'
import readData from './actions/read-data.js'

exports.handler = async (event, context, callback) => {
  const respond = ({ status, body }) => {
    callback(null, {
      statusCode: status,
      body: JSON.stringify({ body }),
    })
  }
  // Avoid errors when excecuting in Lambda
  if (!callback) {
    var callback = () => {}
  }

  try {
    console.time('reorder')
    respond({ status: 201, body: { message: 'request received' } })

    // Read the data from static
    // let sales = JSON.parse(fs.readFileSync('./static/data/sales.json'))
    // let items = JSON.parse(fs.readFileSync('./static/data/items.json'))
    // let categories = JSON.parse(
    //   fs.readFileSync('./static/data/categories.json')
    // )

    // console.log('Getting fresh data')
    let { sales, items, categories } = await updateData('all')

    console.log('Start Reorder')
    await updateReorderPoints(sales, items, categories)

    console.timeEnd('reorder')
  } catch (err) {
    console.error(err)
    respond({ status: 422, body: err })
  }
}
