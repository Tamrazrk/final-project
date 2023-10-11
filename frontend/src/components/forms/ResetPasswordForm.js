import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import { StyledForm } from '../styles/Forms.styled'
import Input from './Input'
import Button from './Button';
import Api from '../../utils/Api';
import { Loader } from '../styles/Global.styled';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  const [isLoading, toggleIsLoading] = useToggle();

  const { currentPassword, newPassword } = formData;

  const handleChange = (event) => {
    setFormData((prev) => {
        const { name, value } = event.target;
        return {
            ...prev,
            [name]: value,
        }
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    
    toggleIsLoading(true);
    const data = await Api.put('/api/auth/change-password', formData);
    toggleIsLoading(false);

    if (data.status === 200) {
        toast.success("Password changed successfully");
        navigate('/');
    }
  }

  return (
    <>
        <StyledForm onSubmit={onSubmit}>
            <h1>Reset your password</h1>
            <Input 
              type={'password'}
              placeholder={'Current password'}
              name={'currentPassword'}
              value={currentPassword}
              handleChange={handleChange}
            />
            <Input 
              type={'password'}
              placeholder={'New password'}
              name={'newPassword'}
              value={newPassword}
              handleChange={handleChange}
            />
            <Button>
                {!isLoading && "Reset"}
                {isLoading && <Loader size={15}/>}
            </Button>
        </StyledForm>
    </>
  )
}
