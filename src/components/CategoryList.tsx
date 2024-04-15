import React from 'react'
import styled from 'styled-components';
import {categories} from '../data/data';
import CategoryRowItem from './CategoryRowItem';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    @media only screen and (max-width: 380px) {
        padding: "0px", flexDirection:"column"
      }
`;

const Categories = () => {
  return (
         <Container>
            {categories.map(item=> (
                <CategoryRowItem item={item} key={item.id}/>
            ))}
        </Container>
   
  )
}

export default Categories