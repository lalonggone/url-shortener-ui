export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

// i want to be able to post a new url to the server

export const postUrl = (title, urlToShorten) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      long_url: urlToShorten
    })
  })
    .then(response => response.json())
}