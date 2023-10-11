import React from 'react'
import { Page } from '../components/styles/Global.styled'
import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import Navbar from '../components/Navbar'

export default function ResetPassword() {
  return (
    <Page>
        <Navbar />
        <ResetPasswordForm />
    </Page>
  )
}
