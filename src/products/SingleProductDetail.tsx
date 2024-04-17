import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import styled from 'styled-components'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Notify from "../components/Notify"
import ProductList from "../components/ProductList"
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

const Box = styled.div`
  padding: 50px;
  display: flex;
  @media only screen and (max-width: 380px) {
    padding: "10px", flexDirection:"column"
  }
`;

const PicBox = styled.div`
  flex: 1;
`;

const Pic = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  @media only screen and (max-width: 380px) {
    height: "40vh"
  }
`;

const ProductInfoBox = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media only screen and (max-width: 380px) {
    padding: "10px" 
  }
`;

const Heading = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const ActionBox = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 380px) {
    width: "100%"
  }
 
`;

const Action = styled.div`
  display: flex;
  align-items: center;
`;

const ActionLabel = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const ActionCategory = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const ActionPrice = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const PriceOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 380px) {
    width: "100%"
  }
 
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;
const SingleProductDetail = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchProducts = async ()=>{
      try{
        
      }catch(err){
        console.log(err)
      }
    }

  },[productId]);

  return (
    <Container>
        <Navbar />
        <Notify />
        
        <Box>
            <PicBox>
                <Pic src="https://images.unsplash.com/photo-1598271174562-9fc1a9ba18ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBvdHRlcnl8ZW58MHx8MHx8fDA%3D" alt="product"/>
            </PicBox>
            <ProductInfoBox>
                <Heading>
                    Mug
                </Heading>
                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed ut metus eget ligula convallis luctus. 
                    Nullam et ligula in
                </Description>
                <Price>$ 18</Price>
                <ActionBox>
            <Action>
              <ActionLabel>Color</ActionLabel>
              <ActionCategory color="black" />
              <ActionCategory color="darkblue" />
              <ActionCategory color="gray" />
            </Action>
            <Action>
              <ActionLabel>Size</ActionLabel>
              <ActionPrice>
                <PriceOption>XS</PriceOption>
                <PriceOption>S</PriceOption>
                <PriceOption>M</PriceOption>
                <PriceOption>L</PriceOption>
                <PriceOption>XL</PriceOption>
              </ActionPrice>
            </Action>
          </ActionBox>
          <AddContainer>
            <AmountContainer>
              <RemoveShoppingCartIcon />
              <Amount>1</Amount>
              <AddShoppingCartIcon />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
            </ProductInfoBox>
        </Box>
        <Footer />
    </Container>
  )
}

export default SingleProductDetail