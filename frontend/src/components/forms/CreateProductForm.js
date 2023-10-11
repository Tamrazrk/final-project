import React, {useEffect, useMemo, useState} from 'react'
import { StyledForm } from '../styles/Forms.styled'
import { ImageUpload, StyledCreateProduct } from '../styles/Product.styled';
import Input from './Input';
import Api from '../../utils/Api';
import Select from 'react-select';
import {categories} from '../../utils/constants';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../features/products/productSlice';
import { Loader } from '../styles/Global.styled';
import { useParams } from 'react-router-dom';
import { add } from '../../features/cart/cartSlice';

export default function CreateProductForm() {
  const [image_url, set_image_url] = useState(null);
  const [option, setOption] = useState('');
  const [fetching, setFetching] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [product, setProduct] = useState({});
  const [uploading, setUploading] = useState(false);
  const user = useSelector(state => state.auth.user);

  const options = useMemo(() => 
    categories.map((category, i) => ({ value: i, label: category }) ), []);
  
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.products);

  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      let product = await Api.get(`/api/products/${id}`);
      setFetching(false);

      setProduct(product.data);

      product = product.data;
      setOption({value: "fasf", label: product.category});
      set_image_url(product.image_url);
      setIsMe(user._id === product.owner || !id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      })
    }
    fetchData();
  }, [id, user._id])

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setOption('');
    set_image_url(null);
  }

  const { name, description, price } = formData;

  const onUpload = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("image", file);

    setUploading(true);
    const res = await Api.get("/api/products/upload_image");
    
    const url = res.data.url;

    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: file,
    });
    setUploading(false);
    const imageUrl = url.split('?')[0];
    set_image_url(imageUrl);

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const categoryChangeHandler = value => {
    setFormData({
      ...formData,
      category: value.label,
    });
    setOption(value);
  }

  const onAddToCart = () => {
    dispatch(add(product));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(createProduct({ ...formData, image_url: image_url }));
      resetForm();
    } 
    if (!isMe) {
      onAddToCart();
    } 
    else if (id) {
      dispatch(updateProduct({ ...formData, image_url: image_url, id: id }));
    }
  }

  return (
    <>
      {fetching ?
      <Loader size={100}/> :
      <StyledCreateProduct>
          <ImageUpload>
            <div className='product-image'>
            {!uploading &&
             <img 
              src={image_url ? image_url : 'image-placeholder.png'}
              alt='product'
              className='product-image'
            /> }
            {uploading && <Loader size={50}/>}
            </div>
            {isMe &&  <input 
              type='file'
              onChange={onUpload}
            /> }
          </ImageUpload>
          <StyledForm onSubmit={handleSubmit}>
            <Input 
              placeholder="name"
              type='text'
              name={'name'}
              value={name}
              handleChange={handleChange}
              disabled={!isMe}
            />
            <textarea 
              placeholder='description'
              value={description}
              onChange={handleChange}
              name='description'
              disabled={!isMe}
            />
            <Input 
              placeholder='price'
              type='number'
              name="price"
              value={price}
              handleChange={handleChange}
              disabled={!isMe}
            />
            <Select 
            options={options}
            value={option}
            placeholder="Categories"
            onChange={categoryChangeHandler}
            isDisabled={!isMe}
            />

            {isMe && 
            <Button>
              {!isLoading && "Save"}
              {isLoading && <Loader size={15}/>}
            </Button> }
            {!isMe && 
            <Button onClick={onAddToCart}>
              Add to cart
            </Button> }
          </StyledForm>
      </StyledCreateProduct> }
    </>
  )
}
