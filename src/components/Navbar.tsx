import React from 'react'
import { Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import styled from 'styled-components'
const Container = styled.div`    
    height:60px;
    background-color: #f0f0f0; 
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
`
const Input = styled.input`
    border: none;
`
const Logo = styled.h1`
    font-weight: bold;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
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