import React from 'react'
import './NotConnected.css'

const NotConnected = () => {
  return (
    <div className='nc-center'>
        <div className="not-connected-container">
            <h2>Wallet Not Found</h2>
            <p>Seems like you have not connected </p>
            <p>Please Connect your Wallet to continue</p>
        </div>
      
    </div>
  )
}

export default NotConnected
