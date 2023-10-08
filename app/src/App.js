import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import Navbar from './components/navbar';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dubbedVideo, setDubbedVideo] = useState('');
  const [loading, setLoading] = useState(false);

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
      <Navbar />
    <div className="App">
      
      <h1 className='main-head'>Dub Youtube Videos</h1>
          <p className='sub-head'>Put the link of your yt video to dub</p>
      <input className='url-box' type="text" placeholder="Enter YouTube URL" value={youtubeUrl} onChange={handleUrlChange} />
      <button onClick={handleDubVideo} disabled={loading} className='dub-button'>
        {loading ? 'Dubbing...' : 'Dub Video'}
      </button>
      {dubbedVideo && (
        <div>
          <h2>Dubbed Video</h2>
          <video width="640" height="360" controls>
            <source src={dubbedVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
