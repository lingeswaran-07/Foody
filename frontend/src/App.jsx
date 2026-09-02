import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import { Routes ,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useState } from 'react';
import Cart from './Pages/Cart/Cart';
import Placeorder from './Pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import AppDownload from './components/AppDownload/AppDownload';
import Login from './components/Login/Login';


const App = () => {
  const[showlogin,setshowlogin]=useState(false)
  return (
    <>
    {showlogin?<Login setshowlogin={setshowlogin}/>:<></>}
    <div className='App'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/order' element={<Placeorder/>}/>
      </Routes>
    </div>
  
    <Footer />
    </>
  );
};

export default App;
