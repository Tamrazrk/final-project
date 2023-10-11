import React from 'react'
import Navbar from '../components/Navbar'
import { Page } from '../components/styles/Global.styled'
import Products from '../components/Products'

export default function Home() {
  return (
    <Page>
        <Navbar shouldBeSearch={true}/>
        <Products />
    </Page>
  )
}
