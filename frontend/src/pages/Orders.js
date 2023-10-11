import React, { useEffect, useState } from 'react'
import { Page } from '../components/styles/Global.styled'
import Navbar from '../components/Navbar'
import Api from '../utils/Api';
import { OrdersContainer } from '../components/styles/Cart.styled';
import { formatedDate } from '../utils/helpers';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Api.get("/api/orders");
      setOrders(response.data);
    }
    fetchData();
  }, []);

  return (
    <Page>
        <Navbar />
        <OrdersContainer>
            { orders?.map((order, i) => 
                <div className='order' key={i}>
                    <p>Order id: <b>{order._id}</b></p>
                    <p>Date: <b>{formatedDate(order.createdAt)}</b></p>
                    <p>Total cost: <b>{Number(order.cost).toFixed(2)}</b></p>
                </div>
            ) }
        </OrdersContainer>
    </Page>
  )
}
