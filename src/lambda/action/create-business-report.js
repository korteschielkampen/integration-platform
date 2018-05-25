import readDayreportFinancial from './read-financial-reports.js'
import readDayreportCategory from './read-category-reports.js'
import readDayreportArticle from './read-article-reports.js'
import createChart from './create-chart.js'
import createDayReport from '../models/rapporten/day.js'
import createMessage from '../api/slack/create-message.js'

export default async (datesArray, channel) => {
  // Read dayreports from Lightspeed
  console.log('Generating Financial Report')
  let financialReports = await readDayreportFinancial(datesArray)
  financialReports[0].chart = await createChart(financialReports[0], channel)

  console.log('Generating Category Report')
  let categoryReport = await readDayreportCategory(datesArray)

  console.log('Generating Article Report')
  let articleReport = await readDayreportArticle(datesArray)

  console.log('Generating Barchart')
  categoryReport.chart = await createChart(categoryReport, channel)

  // Post to Slack
  await createMessage(
    createDayReport(financialReports[0], categoryReport, articleReport, channel)
  )
  return true
}
