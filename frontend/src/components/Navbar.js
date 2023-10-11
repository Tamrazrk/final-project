import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNavbar } from './styles/Navbar.styled'
import { logout } from '../features/auth/authSlice';
import { categories } from '../utils/constants';
import user from '../assets/user.png';
import cart from '../assets/cart.png';
import logo from '../assets/logo.png';
import logout_icon from '../assets/logout.png';
import menu from '../assets/menu.png';
import Dropdown from './Dropdown';
import { SearchInput } from './styles/Dropdown.styled';
import { getProducts, reset } from '../features/products/productSlice';
import useToggle from '../hooks/useToggle';

export default function Navbar({ shouldBeSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, toggleOpen] = useToggle(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { count } = useSelector(state => state.cart);

  const onSelectCategory = (value) => {
    setSelectedCategory((prev) => {
      dispatch(reset());
      if (value === "My products") {
        dispatch(getProducts({ mine: true }));
        return value;
      }
      if (value === "All") {
        dispatch(getProducts());
        return value;
      }
      dispatch(getProducts({category: value }));
      return value;
    });
  }

  const onSearch = (event) => {
    setSelectedCategory(null);
    dispatch(reset());
    dispatch(getProducts({ name: event.target.value }))
  }

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <StyledNavbar shouldBeSearch={shouldBeSearch}>
      <div className='navbar-left'>
        {shouldBeSearch &&
         <>
        <Dropdown 
          options={["All", "My products", ...categories]}
          placeholder={'Filter by category'}
          handleChange={onSelectCategory}
          value={selectedCategory}
        />
        <SearchInput
          type="text"
          placeholder="Search by name"
          onChange={onSearch}
        />
        </> }
      </div>
      <div className='navbar-mid'>
        <Link to='/'>
          <img 
          src={logo}
          alt='logo-icon'/>
        </Link>
      </div>
      <div className='navbar-right'>
        <Link to={'/create_product'}>Create product</Link>
        <Link to={'/profile'}>
          <img 
            src={user}
            alt='user-icon' 
            className='user-icon'
            width={20}/>
        </Link>  
        <Link to={'/cart'}>
        <div className='cart-icon-container'>
          <img 
            src={cart}
            alt='cart-icon' 
            className='cart-icon'
            width={20}/>
            {count !== 0 && 
            <div className='cart-count'>{ count }</div> }
        </div>
        </Link>
        <img 
          src={logout_icon}
          alt='logout-icon' 
          className='logout-icon'
          onClick={onLogout}
          width={20}/>
      </div>
      <img 
        src={menu}
        alt='menu'
        className='menu-icon'
        onClick={toggleOpen}
      />
      {open && 
      <div className='navbar-right-sm'>
        <Link to={'/create_product'}>Create product</Link>
        <Link to={'/profile'}>
          <img 
            src={user}
            alt='user-icon' 
            className='user-icon'
            width={20}/>
        </Link>  
        <Link to={'/cart'}>
        <div className='cart-icon-container'>
          <img 
            src={cart}
            alt='cart-icon' 
            className='cart-icon'
            width={20}/>
            {count !== 0 && 
            <div className='cart-count'>{ count }</div> }
        </div>
        </Link>
        <img 
          src={logout_icon}
          alt='logout-icon' 
          className='logout-icon'
          onClick={onLogout}
          width={20}/>
      </div>}
    </StyledNavbar>
  )
}
