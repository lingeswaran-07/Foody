import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../Context/StoreContext';
import addicon from '../../assets/frontend_assets/add_icon_green.png'
import incicon from '../../assets/frontend_assets/add_icon_white.png'
import decicon from '../../assets/frontend_assets/remove_icon_red.png'
import rating from '../../assets/frontend_assets/rating_starts.png'
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartitems, addtocart, removeFromCart, url } = useContext(StoreContext);

  const handleAddToCart = () => {
    addtocart(id);
    console.log(id);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img 
          className='food-item-image' 
          src={image ? `${url}/images/${image}` : 'fallback-image-url.jpg'} 
          alt={name || 'Food item'} 
        />
        {!cartitems?.[id] ? (
          <img
            className='firstadd'
            onClick={handleAddToCart}
             src={incicon}
            
            alt="Add item"
          />
        ) : (
          <div className='item_counter'>
            <img
              className='minus'
              onClick={handleRemoveFromCart}
              src={decicon}
              alt="Decrease count"
            />
           <p>{cartitems?.[id] ?? 0}</p>

            <img
              className='add'
              onClick={handleAddToCart}
              src={addicon}       
        
              alt="Increase count"
            />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={rating} alt="Rating stars" />
        </div>
        <p className='food-item-desc'>{description || 'No description available'}</p>
        <p className='food-item-price'> ₹ {price || 'N/A'}</p>
      </div>
    </div>
  );
};

export default FoodItem;
