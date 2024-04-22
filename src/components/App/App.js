import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm'

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls()
      .then(data => setUrls(data.urls))
      .catch(error => console.error('Error:', error))
  }, [])

  //add url to the existing array of urls for display
  const addUrl = (newUrl) => {
    setUrls([...urls, newUrl])
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm postUrl={postUrl} addUrl={addUrl}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  )
}

export default App;
