import React from 'react'
import { CartItemLeft, CartItemRight, StyledCartItem } from './styles/Cart.styled'
import { useDispatch } from 'react-redux';
import { add, remove } from '../features/cart/cartSlice';

export default function CartItem({ item }) {
  const { name, price, image_url } = item.product;
  const dispatch = useDispatch();

  const onPlus = () => {
    dispatch(add(item.product));
  }

  const onMinus = () => {
    dispatch(remove(item.product._id));
  }
    
  return (
    <StyledCartItem>
        <CartItemLeft>
            <h3>{ name }</h3>
            <h3>{Number(price).toFixed(2)}$</h3>
            <p>Quantity: <b>{ item.cnt }</b></p>
            <div className='add-remove'>
                <div className='plus-minus' onClick={onMinus}>-</div>
                <div className='plus-minus' onClick={onPlus}>+</div>
            </div>
        </CartItemLeft>
        <CartItemRight>
            <img 
              src={image_url ? image_url : 'image-placeholder.png'}
              alt='productimg'
              className='cart-image'
            />
        </CartItemRight>
    </StyledCartItem>
  )
}
