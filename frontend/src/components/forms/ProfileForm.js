import React, { useEffect, useState } from 'react'
import { StyledProfile } from '../styles/Profile.styled'
import { StyledForm } from '../styles/Forms.styled'
import Input from './Input';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelector from '../CountrySelector';
import { getProfile, updateUser } from '../../features/auth/authSlice';
import { Loader } from '../styles/Global.styled';
import { Link } from 'react-router-dom';

export default function ProfileForm() {
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    ...user,
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const { name, email, country, postalCode, phone_number, address, balance } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const countryChangeHandler = value => {
    setFormData({
        ...formData,
        country: value.label,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(formData));
  }

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  return (
    <StyledProfile>
        <StyledForm onSubmit={handleSubmit}>
            <h1>Profile info</h1>
            <Input 
                placeholder={'name'}
                name={'name'}
                type={'text'}
                value={name}
                handleChange={handleChange}
                labeled
            />
            <Input 
                placeholder={'email'}
                name={'email'}
                type={'email'}
                value={email}
                handleChange={handleChange}
                labeled
            />
            
            <CountrySelector 
                value={country}
                handleChange={countryChangeHandler}
            />
            <Input 
                placeholder={'address'}
                name={'address'}
                type={'text'}
                value={address ? address : ''}
                handleChange={handleChange}
                labeled
            />
            <Input 
                placeholder={'Postal code'}
                name={'postalCode'}
                type={'text'}
                value={postalCode ? postalCode : ''}
                handleChange={handleChange}
                labeled
            />
            <Input 
                placeholder={'Phone number'}
                name={'phone_number'}
                type={'number'}
                value={phone_number ? phone_number : ''}
                handleChange={handleChange}
                labeled
            />
            <Input 
                placeholder={'Balance'}
                name={'balance'}
                type={'number'}
                value={balance ? balance : ''}
                handleChange={handleChange}
                labeled
                disabled
            />
            <Link to={'/reset_password'}><p>Reset password</p></Link>
            <Link to={'/orders'}><p>My orders</p></Link>
            <Button>
                {!isLoading && "Save"}
                {isLoading && <Loader size={15} />}
            </Button>
        </StyledForm>   
    </StyledProfile>
  )
}
