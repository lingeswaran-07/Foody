import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const Exploremenu = ( {category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>explore our menu</h1>
      <p className='explore-menu-text'>Welcome to Tomato, where delicious meals are just a click away! Our platform brings together a wide range of cuisines from your favorite local restaurants, allowing you to explore and order your next meal effortlessly. Whether you're craving a juicy burger, fresh sushi, spicy Indian curry, or a classic Italian pizza, we've got something for everyone.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
            return (
           <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='explore-menu-list-item'>
            <img className={category===item.menu_name?"active":""}src={item.menu_image} alt=""/>
            <p>{item.menu_name}</p>
           </div>
            )
        })}
      </div>
      <hr/>
    </div>
   
  )
}

export default Exploremenu;
