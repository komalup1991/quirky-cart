import React from 'react'
import styled from 'styled-components';
import { Search} from '@mui/icons-material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';



const Details = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;


const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Details}{
    opacity: 1;
  }
`;

const Pic = styled.img`
  height: 75%;
  z-index: 2;
`;

const IconList = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
}`;

const Bubble = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
    `;

interface ProductProps {
      item: any; 
  }

const ProductDetail:React.FC<ProductProps> = ({item}) => {
  return (
    <Container>
      <Bubble/>
      <Pic src={item.image}/>
      <Details>
        <IconList>
          <Link  to={`/product/${item.id}`}>
          <Search/>
          </Link>
       
        </IconList>
        <IconList>
        <ShoppingCartIcon/>
        </IconList>
        <IconList>
        <BookmarkBorderIcon/>
        </IconList>
      </Details>   
    </Container>
  )
}

export default ProductDetail