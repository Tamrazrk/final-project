import React, { useState } from 'react';
import { StyledForm } from '../styles/Forms.styled';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import Button from './Button';
import { Loader } from '../styles/Global.styled';
import { register } from '../../features/auth/authSlice';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { email, name, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  return (
    <StyledForm
        onSubmit={handleSubmit}
    >
        <h1>Sign up for your account</h1>

        <Input 
          handleChange={handleChange}
          type={'text'}
          placeholder={'name'}
          name='name'
          value={name}
        />

        <Input 
          handleChange={handleChange}
          type={'email'}
          placeholder={'email'}
          name='email'
          value={email}
        />

        <Input 
          handleChange={handleChange}
          type={'password'}
          placeholder={'password'}
          name='password'
          value={password}
        />

        <Button>
        {isLoading ? "" : "Sign up" }
          {isLoading && <Loader size={15}/>} 
        </Button>
    </StyledForm>
  );
};

export default RegisterForm;
