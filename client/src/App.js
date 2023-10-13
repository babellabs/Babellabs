import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import Settings from './components/Settings';
function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dubbedVideo, setDubbedVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState("Running Our Model...")
  const [shouldChangeText, setShouldChangeText] = useState(false)
  const [finish, setFinish] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const changeText = () =>{
    setShouldChangeText(true)
  }
  useEffect(() => {
    if (shouldChangeText) {
      const timeout = setTimeout(() => {
        setWork('Loading Your Final Video');
        setShouldChangeText(false);
        setFinish(true)
      }, 60000);
      setFinish(true)

      
      return () => clearTimeout(timeout);
    }
  }, [shouldChangeText]);

  useEffect(() =>{
    if (finish) {
    const timeout = setTimeout(() => {
      setLoadVideo(true)
      
    }, 2000);
    return () => clearTimeout(timeout);
  }
  })

  
  const renderModels = () =>{
    return(
      <div className='render-model'>
          <h3>{work}</h3>
      </div>
    )
  }

  const handleUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const handleDubVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/dub-video', { youtube_url: youtubeUrl });
      if (response.data.dubbed_video) {
        setDubbedVideo(response.data.dubbed_video);
      } else {
        console.error('An error occurred while dubbing the video');
      }
    } catch (error) {
      console.error('An error occurred while communicating with the server', error);
    }
    setLoading(false);
  };


  return (
    <div>
      
      <div className="container">
          <div className="App">
      
      
      <h1 className='main-head'>Dub Youtube Videos</h1>
          <p className='sub-head'>Effortlessly dub and sync videos in multiple languages.</p>
      <input className='url-box' type="text" placeholder="Enter YouTube URL" value={youtubeUrl} onChange={handleUrlChange} />
      <Settings />

        <button onClick={handleDubVideo}  disabled={loading} className='dub-button'>
        <a href="#space" onClick={changeText}>
          {loading ? 'Dubbing...' : 'Dub Video'}
          </a>
        </button>
      
      </div>
      
      <div id="final"></div>
      {loadVideo ?(
        <div className='dubbed-video'>
          <h2>Dubbed Video</h2>
          <div className="video-container">
            <video  className='video' controls>
              <source src={dubbedVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )
      :
      (<div id='render-models'>
      {renderModels()}
    </div>)
      }
    </div>
    <div id="space">

    </div>
    </div>
  );
}

export default App;
