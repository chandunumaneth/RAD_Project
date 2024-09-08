import React from 'react'
import './appDownload.css'
import { assets } from '../../assets/assets'

function appDounload() {
  return (
    <div className='app-download'  id='app-download'>
      <p>For better expiriance Download <br/>Tomato App</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default appDounload
