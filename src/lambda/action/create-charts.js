import qS from 'query-string'
import moment from 'moment'

import createFile from '../api/slack/create-file.js'

export default async (data, channel) => {
  let chartData = [
    [
      data.map(item => {
        if (!item.categoryReport) {
          return 0
        } else {
          return item.categoryReport.Dierenspeciaal.percentage
        }
      }),
    ],
    [
      data.map(item => {
        if (!item.categoryReport) {
          return 0
        } else {
          return item.categoryReport.Aquarium.percentage
        }
      }),
    ],
    [
      data.map(item => {
        if (!item.categoryReport) {
          return 0
        } else {
          return item.categoryReport.Hengelsport.percentage
        }
      }),
    ],
    [
      data.map(item => {
        if (!item.categoryReport) {
          return 0
        } else {
          return item.categoryReport.etc.percentage
        }
      }),
    ],
  ]
  console.log(chartData)

  chartData = chartData.map(value => {
    return value.join(',')
  })

  chartData = chartData.join('|')

  let labels = data.map(item => {
    return moment(item.date.date).date()
  })

  labels = labels.join('|')
  console.log(labels)

  let bar = {
    chtt: 'Categorieën',
    chts: '000000,30,r',
    chs: '999x500',
    cht: 'bvs',
    chd: `t:${chartData}`,
    chco: 'fa8231,3867d6,20bf6b,a5b1c2',
    chxl: `0:|${labels}`,
    chxt: 'x',
  }

  let chartUrl = 'https://image-charts.com/chart?' + qS.stringify(bar)
  console.log(chartUrl)
  return [chartUrl]
}

//  // let chart = await createFile('none', channel)
