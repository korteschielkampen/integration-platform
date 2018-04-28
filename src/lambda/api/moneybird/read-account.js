const fetch = require('node-fetch');

export default async (access_token) => {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };
  const apiUrl = '';

  const res = await fetch(apiUrl, options);
  if (!res.ok) {throw await res.json();}
  return await res.json();
}
