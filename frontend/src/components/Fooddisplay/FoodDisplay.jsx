import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../Fooditem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  food_list.forEach(element => {
      console.log(element);
  });
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item?.category) {
              return (
               <FoodItem
            key={item._id}
                 id={item._id}
             onIncrement={() => handleIncrement(item._id)} // Pass specific item id
             name={item.name || 'Unknown'}
            description={item.description || 'No description available'}
           price={item.price || 'N/A'}
           image={item.image || 'fallback-image-url.jpg'}
             />

              );
            }
            return null;
          })
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
