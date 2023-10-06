import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="App">
      <h1>Dub YouTube Videos</h1>
      <input type="text" placeholder="Enter YouTube URL" value={youtubeUrl} onChange={handleUrlChange} />
      <button onClick={handleDubVideo} disabled={loading}>
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
  );
}

export default App;
