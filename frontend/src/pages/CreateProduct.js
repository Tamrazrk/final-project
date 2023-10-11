import React from 'react'
import { Page } from '../components/styles/Global.styled';
import Navbar from '../components/Navbar';
import CreateProductForm from '../components/forms/CreateProductForm';

export default function CreateProduct() {

  return (
    <Page>
        <Navbar />
        <CreateProductForm />
    </Page>
  )
}
