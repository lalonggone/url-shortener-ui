import React, { useState } from 'react'

function UrlForm({ postUrl, addUrl }) {
  const [title, setTitle] = useState('')
  const [urlToShorten, setUrlToShorten] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    postUrl(title, urlToShorten)
      .then(data => addUrl(data))
      .catch(error => console.error('Error:', error))
    clearInputs()
  }

  const clearInputs = () => {
    setTitle('')
    setUrlToShorten('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title..."
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="URL to Shorten..."
        name="urlToShorten"
        value={urlToShorten}
        onChange={(e) => setUrlToShorten(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten Please!</button>
    </form>
  )
}

export default UrlForm
