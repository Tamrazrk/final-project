import React, { useEffect } from 'react'
import { ProductsContainer, StyledProducts } from './styles/Product.styled'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, reset } from '../features/products/productSlice';
import ProductCard from './ProductCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

export default function Products() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(state => state.products);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    dispatch(reset());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <StyledProducts>
      <ProductsContainer>
        {isLoading && 
          skeletons.map((i) => 
            <Skeleton className='skeleton' key={i}/>
          )
        }
        {products?.map((product) => 
          <Link to={"/product/"+product._id} key={product._id} className='link' >
            <ProductCard product={product}/>
          </Link>
        )}
      </ProductsContainer>
    </StyledProducts>
  )
}
