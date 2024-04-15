import React from 'react'
import styled from 'styled-components'
import ProductDetail from './ProductDetail'
import {top10Products} from '../data/data';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
`;



const ProductList = () => {
  return (
   <Container>
    {
        top10Products.map(item=> (
            <ProductDetail item={item} key={item.id}/>
        ))
    }
   </Container>
  )
}

export default ProductList