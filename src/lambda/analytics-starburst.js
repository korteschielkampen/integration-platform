import moment from 'moment'
import fs from 'fs'

import createSoldItems from './transformation/lightspeed-sales--to--sold-items.js'
import createFinancialReport from './transformation/lightspeed-sales--to--financial-report.js'
import createCategoryReport from './transformation/lightspeed-items--to--category-report.js'
import createWeightedCategoryReport from './transformation/lightspeed-items--to--weighted-category-report.js'
import createArticleReport from './transformation/lightspeed-items--to--article-report.js'
import createSpecialDayReports from './transformation/day-reports--to--day-reports-specials.js'

import createChartCategory from './action/create-chart-category.js'
import createChartIncome from './action/create-chart-income.js'

exports.handler = async (event, context, callback) => {
  const respond = ({ status, body }) => {
    callback(null, {
      statusCode: status,
      body: JSON.stringify({ body }),
    })
  }

  try {
    let sales = JSON.parse(fs.readFileSync('./static/data/sales.json'))
    let items = JSON.parse(fs.readFileSync('./static/data/items.json'))
    let categories = JSON.parse(
      fs.readFileSync('./static/data/categories.json')
    )

    let soldItems = createSoldItems(sales)
    let nestedCategories = createWeightedCategoryReport(
      items,
      soldItems,
      categories
    )

    var json = JSON.stringify({ body: { data: nestedCategories } })
    fs.writeFileSync('./static/data/sunburst.json', json)

    respond({
      status: 200,
      body: { message: 'succes', data: nestedCategories },
    })
  } catch (err) {
    console.log(err)
    respond({ status: 422, body: err })
  }
}
