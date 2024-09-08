import React from 'react'
import './appDownload.css'
import { assets } from '../../assets/assets'

function appDounload() {
  return (
    <div className='app-download'  id='app-download'>
      <div className="app-download-title">
      <p>To get Exclusive offers download our app <br/>ExpressFodd App</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
        </div>
      </div>
    </div>
  )
}

export default appDounload
