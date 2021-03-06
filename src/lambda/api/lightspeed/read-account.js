import request from './request-lightspeed.js'

export default async access_token => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
  const apiUrl = 'https://api.lightspeedapp.com/API/Account.json'

  return await request(apiUrl, options, 1)
}
