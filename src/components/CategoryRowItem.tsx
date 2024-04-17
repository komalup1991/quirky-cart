import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    height: 70vh;
    margin: 3px;
    position: relative;
`;

const Pic = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.8;
    @media only screen and (max-width: 380px) {
        height: "20vh" 
      }
`;

const Details = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
`;

const Heading = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px;
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    border-radius: 10px;
`;



interface CategoryRowItemProps {
    item: any; 
}

const CategoryRowItem: React.FC<CategoryRowItemProps> = ({ item }) => {
  return (
   
        <Container>
            <Link to = {`/products/${item.category}`}>

           
            <Pic src={item.img}/>
            <Details>
                <Heading>{item.title}</Heading>
                <Button>SHOP NOW</Button>
            </Details>   
            </Link>
        </Container>
  )
}

export default CategoryRowItem