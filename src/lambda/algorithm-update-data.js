import updateData from './actions/update-data.js'

exports.handler = async (event, context, callback) => {
  const respond = ({ status, body }) => {
    callback(null, {
      statusCode: status,
      body: JSON.stringify({ body }),
    })
  }
  try {
    let dataType, dataTimeStamp

    if (event) {
      console.log(event)
      dataType = event.queryStringParameters.datatype
      dataTimeStamp = event.queryStringParameters.dataTimeStamp
    } else {
      dataType = 'all'
      dataTimeStamp = 'day'
    }
    console.log(dataType, dataTimeStamp)

    if (!callback) {
      var callback = () => {}
    }
    console.log(event)

    updateData(dataType, dataTimeStamp)

    respond({
      status: 201,
      body: { message: 'request received' },
    })
  } catch (err) {
    console.log(err)
    respond({ status: 422, body: err })
  }
}
