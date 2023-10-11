import React from 'react';
import { Page } from '../components/styles/Global.styled';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import DetailedProduct from '../components/DetailedProduct';

export default function Detailed() {
  const { id } = useParams();

  return (
    <Page>
        <Navbar />
        <DetailedProduct />
    </Page>
  )
}
