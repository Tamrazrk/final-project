import React, { useState } from 'react';
import { StyledForm } from '../styles/Forms.styled';
import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { Loader } from '../styles/Global.styled';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);  

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    dispatch(login(formData));

    e.preventDefault();
  };

  return (
    <StyledForm
        onSubmit={handleSubmit}
    >
        <h1>Sign in to your account</h1>

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
          {isLoading ? "" : "Sign in" }
          {isLoading && <Loader size={15}/>} 
        </Button>
        <Link to={'/register'}>
            <p>Register here</p>
        </Link>
    </StyledForm>
  );
};

export default LoginForm;
