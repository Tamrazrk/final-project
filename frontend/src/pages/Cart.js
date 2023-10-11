import React, { useState } from 'react'
import { Loader, Page } from '../components/styles/Global.styled';
import Navbar from '../components/Navbar'
import { CartContainer, CartItemsContainer } from '../components/styles/Cart.styled'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import Api from '../utils/Api';
import { toast } from 'react-toastify';
import { reset } from '../features/cart/cartSlice';
import { spend } from '../features/auth/authSlice';

export default function Cart() {
  const { products, count, cost } = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const onOrder = async () => {
    if (count === 0) {
      toast.error("Add items to cart");
      return;
    }
    if(user.balance < cost) {
      toast.error("Not enough balance");
      return;
    }

    const data = {
      products, count, cost,
    }
    setIsLoading(true);
    const response = await Api.post("/api/orders", data);
    setIsLoading(false);

    if (response.status === 201) {
      toast.success("Order created");
      dispatch(reset());
      dispatch(spend(cost));
    }


    console.log(response.data);
  }

  return (
    <Page>
        <Navbar />
        <CartContainer>
            <h1>Cart</h1>
            <CartItemsContainer>
                { products.map((item, i) => 
                    <CartItem key={i} item={item} />
                ) }
            </CartItemsContainer>
            <p>Total Quantity: <b>{count}</b></p>
            <p>Total Price: <b>{cost}$</b></p>
            <div className='order-button' onClick={onOrder}>
                  {!isLoading && "Order"}
                  {isLoading && <Loader size={15}/>}
            </div>
        </CartContainer>
    </Page>
  )
}
