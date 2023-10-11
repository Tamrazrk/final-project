import React from 'react'
import { StyledProductCard } from './styles/Product.styled'
import add_cart_icon from '../assets/add-cart-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../features/products/productSlice';
import { add } from '../features/cart/cartSlice';
import useToggle from '../hooks/useToggle';
import bin from '../assets/bin.png';
import ConfirmationModal from './ConfirmationModal';

export default function ProductCard({ product }) {
  const { image_url, name, price } = product;
  const [isOpen, toggleIsOpen] = useToggle(); 

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const isMine = user._id === product.owner;

  const onDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(deleteProduct(product._id));
  }

  const onConfirmOpen = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleIsOpen(true);
  }

  const onConfirmClose = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleIsOpen(false);
  }

  const onAddCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(add(product));
  }

  return (
    <StyledProductCard>
        <img 
          src={image_url ? image_url : 'image-placeholder.png'}
          alt='tech'
          className='product-image'
        />
        {!isMine && 
        <img 
          src={add_cart_icon}
          alt='add-cart'
          className='add-cart-icon'
          onClick={(event) => onAddCart(event)}
        /> }
        <p>{name}</p>
        <p><b>${parseFloat(price).toFixed(2)}</b></p>
        {isMine &&
         <img 
          src={bin}
          alt='bin'
          className='bin-icon'
          onClick={onConfirmOpen}
        /> }
        <ConfirmationModal 
          isOpen={isOpen}
          onClose={onConfirmClose}
          afterNo={onConfirmClose}
          afterYes={onDelete}
        />
    </StyledProductCard>
  )
}
