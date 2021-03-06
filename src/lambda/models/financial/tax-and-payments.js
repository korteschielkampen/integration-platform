import _ from 'lodash'

export default sales => {
  let tax = {
    hoog: { name: 'hoog', amount: 0 },
    laag: { name: 'laag', amount: 0 },
    onbelast: { name: 'onbelast', amount: 0 },
  }

  let payments = {
    cash: { name: 'cash', amount: 0 },
    pin: { name: 'pin', amount: 0 },
    credit: { name: 'credit', amount: 0 },
    gift: { name: 'gift', amount: 0 },
  }

  let analysis = {
    total: 0,
    profit: 0,
    sales: 0,
    unreliabilityCount: 0,
    unreliabilityTotal: 0,
    taxlessTotal: 0,
  }

  if (sales.length > 0) {
    _.map(sales, (sale, saleID) => {
      // Do the taxes
      if (sale.completed == 'true' && sale.SaleLines) {
        _.map(sale.SaleLines.SaleLine, (line, lineID) => {
          switch (line.taxClassID) {
            case '1':
              tax.hoog.amount += parseFloat(line.calcTotal)
              break
            case '3':
              tax.laag.amount += parseFloat(line.calcTotal)
              break
            case '6':
              tax.onbelast.amount += parseFloat(line.calcTotal)
              break
            default:
          }
        })
      }

      // Do the payments
      if (sale.completed == 'true' && sale.SalePayments) {
        _.map(sale.SalePayments.SalePayment, (line, lineID) => {
          if (line.archived != 'true') {
            switch (line.paymentTypeID) {
              case '1':
                payments.cash.amount += parseFloat(line.amount)
                break
              case '11':
                payments.pin.amount += parseFloat(line.amount)
                break
              case '4':
                payments.credit.amount += parseFloat(line.amount)
                break
              case '5':
                payments.gift.amount += parseFloat(line.amount)
                break
              default:
            }
          }
        })
      }

      // Do the analysis
      if (sale.completed == 'true' && sale.SaleLines) {
        analysis.total += parseFloat(sale.calcTotal)
        analysis.sales++
        _.map(sale.SaleLines.SaleLine, (line, lineID) => {
          if (line.archived != 'true') {
            if (line.avgCost == '0') {
              let taxlessTotal =
                parseFloat(line.calcTotal) / (1 + parseFloat(line.tax1Rate))
              analysis.taxlessTotal += taxlessTotal

              analysis.unreliabilityCount++
              analysis.unreliabilityTotal += parseFloat(line.calcTotal)
              analysis.profit += parseFloat(line.calcTotal) * 0.3
            } else {
              // Profit
              let taxlessTotal =
                parseFloat(line.calcTotal) / (1 + parseFloat(line.tax1Rate))
              analysis.profit += taxlessTotal - parseFloat(line.avgCost)
              analysis.taxlessTotal += taxlessTotal

              // Margin
              if (analysis.margin) {
                analysis.margin =
                  (analysis.margin +
                    (taxlessTotal - parseFloat(line.avgCost)) /
                      taxlessTotal *
                      100) /
                  2
              } else {
                analysis.margin =
                  (taxlessTotal - parseFloat(line.avgCost)) / taxlessTotal * 100
              }
            }
          }
        })
      }
    })
  }

  analysis.saleSize = analysis.total / analysis.sales
  // analysis.profit =
  //   analysis.profit - tax.hoog.amount * 0.21 - tax.laag.amount * 0.6

  tax.hoog.amount = tax.hoog.amount.toFixed(2)
  tax.laag.amount = tax.laag.amount.toFixed(2)
  tax.onbelast.amount = tax.onbelast.amount.toFixed(2)

  payments.cash.amount = payments.cash.amount.toFixed(2)
  payments.pin.amount = payments.pin.amount.toFixed(2)
  payments.credit.amount = payments.credit.amount.toFixed(2)
  payments.gift.amount = payments.gift.amount.toFixed(2)

  return {
    tax: tax,
    payments: payments,
    analysis: analysis,
  }
}
