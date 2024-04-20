import React from 'react'
import { Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {store} from '../redux/store';
import { RootState } from '../redux/store';


import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Container = styled.div`    
    height:60px;
    background-color: #f0f0f0; 
    @media only screen and (max-width: 380px) {
        height: "50px";
      }   
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 380px) {
        padding: "10px 0px"
      }  
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
`
const Input = styled.input`
    border: none;
    @media only screen and (max-width: 380px) {
        width: "50px"
      }
`
const Logo = styled.h1`
    font-weight: bold;
    @media only screen and (max-width: 380px) {
        fontSize: "12px", marginLeft: "10px"
      }
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    @media only screen and (max-width: 380px) {
        flex: 2, justifyContent: "center"
      }
`
const LeftDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const MiddleDiv = styled.div`
    // flex: 1;
    display: flex;
    align-items: center;
    text-align: center;
`

const RightDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media only screen and (max-width: 380px) {
        flex: 2, justifyContent: "center"
      }
`
  

const Navbar = () => {
    const quantity = useSelector((state: RootState) => state.shoppingCart.quantity); 
    console.log(quantity);
  return (
    <Container>
        <Wrapper>

            <LeftDiv>
                <SearchContainer>
                <Input/>
                <Search style={{color:"gray", fontSize:16}}/>
                </SearchContainer>
            </LeftDiv>

            <MiddleDiv>
                <Link to="/"  style={{ textDecoration: 'none', color:"black" }}>
               
                <Logo>QUIRKY CART.</Logo>
                </Link>
            </MiddleDiv>

            <RightDiv>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <Link to="/shoppingCart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </MenuItem>
                </Link>
             
               
            </RightDiv>

        </Wrapper>
       
    </Container>
  )
}

export default Navbar