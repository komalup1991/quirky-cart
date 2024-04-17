import React, { useState } from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Notify from "../components/Notify"
import ProductList from "../components/ProductList"
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

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
    @media only screen and (max-width: 380px) {
      width: "0px 20px", display: "flex", flexDirection: "column"
    }
`;
const ActionLabel = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    @media only screen and (max-width: 380px) {
      marginRight: "0px" 
    }
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    @media only screen and (max-width: 380px) {
      margin: "10px 0px"
    }
`;

const Option = styled.option``;


const AllProducts = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [sort, setSortOrder] = useState("latest");
  const [filters, setFilters] = useState({});
  const applyFilters = (e: { target: { value: any; name: any } }) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };
  console.log(filters);
  return (
    <Container>
        <Notify />
        <Navbar />
       
        <Heading>
            {category}
        </Heading>
        <ActionList>
            <Action>
                <ActionLabel>
                    Filter
                </ActionLabel>
                <Select name="color" onChange={applyFilters}>
            <Option disabled >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={applyFilters}>
            <Option disabled >
              Size
            </Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select >
            </Action>
            <Action>
                <ActionLabel>
                    Sort
                </ActionLabel>
                <Select onChange={(e)=>setSortOrder(e.target.value) } >
            <Option value="latest" >Latest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>                
            </Action>    
        </ActionList>


        <ProductList category={category} filters={filters} sort={sort} />
        <Footer />
    </Container>
  )
}

export default AllProducts