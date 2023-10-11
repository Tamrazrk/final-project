import React from 'react'
import { StyledFormInput } from '../styles/Forms.styled'

export default function Input({
    type,
    placeholder,
    value,
    handleChange,
    disabled,
    name,
    labeled,
}) {
  return (
    <StyledFormInput>
        {labeled && <label>{placeholder}</label> }
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            name={name}
        />
    </StyledFormInput>
  )
}
