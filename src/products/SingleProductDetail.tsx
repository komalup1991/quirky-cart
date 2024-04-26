import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Notify from "../components/Notify";
import ProductList from "../components/ProductList";
import { useLocation } from "react-router-dom";
import { loggedInUserRequest, publicRequest } from "../auth/AllApi";

import { addProduct } from "../redux/shoppingCartRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductInterface } from "../redux/productRedux";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const API = `${BASE_API_URL}/api/`;

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
    height: "40vh";
  }
`;

const ProductInfoBox = styled.div`
  flex: 1;
  padding: 0px 50px;
  // border: 1px solid lightgray;
  // margin-left: 20px;
  @media only screen and (max-width: 380px) {
    padding: "10px";
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
    width: "100%";
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
    width: "100%";
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

  &:hover {
    background-color: #f8f4f4;
  }
`;
const SingleProductDetail: React.FC = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [products, setProducts] = useState<ProductInterface | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [productId]);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const addToCart = async () => {
    const res = await loggedInUserRequest.post(
      `${API}cart/c/addToCart/userId=${user?.id}/productId=${productId}`,
      { quantity: quantity },
    );

    dispatch(addProduct({ ...products, quantity }));
  };
  return (
    <Container>
      <Navbar />
      <Notify />

      <Box>
        <PicBox>
          <Pic src={products?.image} />
        </PicBox>
        <ProductInfoBox>
          <Heading>{products?.name}</Heading>
          <Description>{products?.description}</Description>
          <Price>$ {products?.price}</Price>
          <ActionBox>
            <Action>
              <ActionLabel>Color</ActionLabel>
              <ActionCategory color={products?.color} />
            </Action>
            <Action>
              <ActionLabel>Size</ActionLabel>
              <ActionPrice>
                <PriceOption>{products?.size}</PriceOption>
              </ActionPrice>
            </Action>
          </ActionBox>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon
                onClick={() => {
                  quantity > 1 && setQuantity(quantity - 1);
                }}
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </ProductInfoBox>
      </Box>
      <Footer />
    </Container>
  );
};

export default SingleProductDetail;
