import React from 'react'
import SelectLanguage from './SelectLanguage'
import './Settings.css'
import Advanced from './Advanced'

const Settings = () => {
  return (
    <div className="settings-container">
        <div className='settings-options'>
            <div className="settings-text">
            Languages 
            </div>
            <div className="settings-menu">
            <SelectLanguage />
            </div>
        </div>
        <div className='settings-options'>
            <div className="settings-text">
            Advanced options 
            </div>
            <div className="settings-menu">
            <Advanced />
            </div>
        </div>
        
      </div>
  )
}

export default Settings
