import React from 'react'
import { Page } from '../components/styles/Global.styled';
import ProfileForm from '../components/forms/ProfileForm';
import Navbar from '../components/Navbar';

export default function Profile() {
  return (
    <Page> 
        <Navbar />
        <ProfileForm />
    </Page>
  )
}
