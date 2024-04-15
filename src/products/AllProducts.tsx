import React from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Notify from "../components/Notify"
import ProductList from "../components/ProductList"
import styled from 'styled-components'

const Container = styled.div``;
const Heading = styled.h1`
    margin: 20px;
`;
const ActionList = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Action = styled.div`
    margin: 20px;
`;
const ActionLabel = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`;

const Option = styled.option``;

const AllProducts = () => {
  return (
    <Container>
        <Notify />
        <Navbar />
       
        <Heading>
            All Products
        </Heading>
        <ActionList>
            <Action>
                <ActionLabel>
                    Filter
                </ActionLabel>
                <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Category
            </Option>
            <Option>Mugs</Option>
            <Option>Bags</Option>
            <Option>Key rings</Option>
          </Select>
            </Action>
            <Action>
                <ActionLabel>
                    Sort
                </ActionLabel>
                <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>                
            </Action>    
        </ActionList>


        <ProductList />
        <Footer />
    </Container>
  )
}

export default AllProducts