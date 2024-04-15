import React from 'react'
import { Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import styled from 'styled-components'
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
                <Logo>QUIRKY CART.</Logo>
            </MiddleDiv>

            <RightDiv>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <MenuItem>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </MenuItem>
               
            </RightDiv>

        </Wrapper>
       
    </Container>
  )
}

export default Navbar