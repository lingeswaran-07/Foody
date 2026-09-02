import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className="app-download" id="app_download">
    
        <p>For Better Experience Download<br />Zomato App</p>
        <div className="icons">
          <img src={assets.play_store} alt="Play Store" />
          <img src={assets.app_store} alt="App Store" />
       
      </div>
    </div>
  );
};


export default AppDownload
