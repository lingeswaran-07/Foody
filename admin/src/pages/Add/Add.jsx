import { useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const validateImage = (file) => {
    if (!file) {
      console.error('No file selected');
      toast.error('Please select an image');
      return false;
    }

    // Check file type (only allow JPEG and PNG)
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      toast.error('Only JPEG and PNG images are allowed');
      return false;
    }

    // Check file size (e.g., max 5MB)
    const maxSizeInMB = 5;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      console.error('File size exceeds limit:', file.size);
      toast.error(`Image size should not exceed ${maxSizeInMB}MB`);
      return false;
    }

    console.log('Image validation passed:', file);
    return true;
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];

    console.log('Selected file:', file);

    if (validateImage(file)) {
      setImage(file); // Only set image if validation passes
    } else {
      setImage(false); // Reset image if validation fails
    }
  };

  const onSubmithandler = async (event) => {
    event.preventDefault();

    console.log('Submitting form with data:', data);
    console.log('Image file:', image);

    if (!image) {
      toast.error('Please upload a valid image');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      console.log('Sending POST request to:', `${url}/api/food/add`);
      const response = await axios.post(`${url}/api/food/add`, formData);

      console.log('Response from server:', response.data);

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(false);
        toast.success(response.data.message);
        console.log('Form submitted successfully. Resetting state.');
      } else {
        toast.error(response.data.message);
        console.error('Server responded with an error:', response.data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(`Updating field: ${name}, Value: ${value}`);

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmithandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            type='file'
            onChange={onImageChange}
            id='image'
            hidden
            required
          />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type here'
          />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Write content here'
          />
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name='category'
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='Number'
              name='price'
              placeholder='$20'
            />
          </div>
        </div>
        <button type='submit' className='add-btn'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
