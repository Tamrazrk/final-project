import React from 'react'
import { StyledFormButton } from '../styles/Forms.styled'

export default function Button({
    children
}) {
  return (
    <StyledFormButton>
        { children }
    </StyledFormButton>
  )
}
