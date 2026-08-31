import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
                <div className='footer-content'>
                  <div className='footer-content-left'>
                    <img src={assets.logo}/>
                    <p>© 2024 Your Company Name. All rights reserved. We are committed to providing top-quality services and products. By using this site, you agree to our Terms of Service and Privacy Policy. Have questions? Contact Us. Stay connected with us on social media for the latest updates and offers.</p>
                    <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}/>
                    <img src={assets.twitter_icon}/>
                    <img src={assets.linkedin_icon}/>
                    </div>
                  </div>

                  <div className='footer-content-center'>
                    <h2>Company</h2>
                    <ul>
                      <li>Home </li>
                      <li>About us</li>
                      <li>Delivery</li>
                      <li>Privacy policy</li>

                    </ul>
                  </div>
                  <div className='footer-content-right'>
                    <h2>
                      Get In Touch
                    </h2>
                    <ul>
                      <li>+91-9787634501
                      </li>
                      <li>Contact@foody.com
                      </li>
                    </ul>
                  </div>
                  <hr/>
                  <p className='footer-copyright'>
                    Copyright 2024 @foody
                  </p>
                </div>
      
    </div>
  )
}

export default Footer