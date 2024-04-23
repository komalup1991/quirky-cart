import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Notify from '../components/Notify';
import Footer from '../components/Footer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../redux/store';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';

// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Token } from 'react-stripe-checkout'; 
import { loggedInUserRequest } from '../auth/AllApi';
import { updateCart, setTotalQuantity } from '../redux/shoppingCartRedux'
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const API = `${BASE_API_URL}/api/`;


const KEY = process.env.REACT_APP_STRIPE_KEY || '';

const Container = styled.div``;

const Box = styled.div`
    padding: 20px;
    @media only screen and (max-width: 380px) {
        padding: "10px"
      }
`;

const Heading = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Start = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StartButton = styled.button`
    padding: 10px;
    margin: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === 'submit' && 'none'};
    background-color: ${(props) => (props.type === 'submit' ? 'black' : 'transparent')};
    color: ${(props) => props.type === 'submit' && 'white'};
`;

const StartTexts = styled.div`
@media only screen and (max-width: 380px) {
    display: "none"
  }
  `;
const StartText = styled.span`
    margin: 0px 10px;
    cursor: pointer;
    text-decoration: underline;
`;

const End = styled.div`
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 380px) {
        flexDirection: "column"
      }
`;

const About = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 380px) {
        flexDirection: "column"
      }
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Pic = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const ProductAmount = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    @media only screen and (max-width: 380px) {
        margin: "5px 15px"
      }
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    @media only screen and (max-width: 380px) {
        marginBottom: "20px"
      }
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const CustomSummary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const CustomSummaryTitle = styled.h1`
    font-weight: 200;
`;

const CustomSummaryItem = styled.div<{ type?: string }>`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;

const CustomSummaryItemText = styled.span``;

const CustomSummaryItemPrice = styled.span``;

const CustomButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const ShoppingCart = () => {
    
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const dispatch = useDispatch()

    useEffect(()=>{
    const getProductsForCart = async () => {
        try{
            const res = await loggedInUserRequest.get(
                `${API}cart/userId=${user?.id}`
            ); 
            console.log("getProductsForCart = ", res.data);
            dispatch(updateCart(res.data));
            } catch(err){
            }
        };
        getProductsForCart()
    },[user, shoppingCart.totalQuantity]);

    const addToCart  = async (productId: number) => {
        const res = await loggedInUserRequest.post(
          `${API}cart/c/addToCart/userId=${user?.id}/productId=${productId}`, { "quantity": 1 }
        );
        console.log("addToCart = ", res);
        dispatch(setTotalQuantity(shoppingCart.totalQuantity + 1))
    }

    const updateProductQuantityInCart  = async (productId: number, quantity: number) => {
        const res = await loggedInUserRequest.put(
          `${API}cart/userId=${user?.id}/productId=${productId}`, { "quantity": quantity }
        );
        console.log("updateProductQuantityInCart = ", res);
        dispatch(setTotalQuantity(shoppingCart.totalQuantity - quantity))
    }

    // const removeFromCart  = async (productId: number) => {
    //     const res = await loggedInUserRequest.post(
    //       `${API}cart//cart/userId=${user?.id}/productId=${productId}`, { "quantity": 1 }
    //     );
    //     dispatch(setTotalQuantity(shoppingCart.totalQuantity - 1))
    // }
      
    return   (
        <Container>
            <Navbar />
            <Notify />
            <Box>
                <Heading>YOUR BAG</Heading>
                <Start>
                    <StartButton>CONTINUE SHOPPING</StartButton>
                    <StartTexts>
                        <StartText>Shopping Bag(2)</StartText>
                        <StartText>Your Wishlist(0)</StartText>
                    </StartTexts>
                    <StartButton type="submit">CHECKOUT</StartButton>
                </Start>
                <End>
                    <About>
                        
                            {shoppingCart.products.filter((item) => item.product != null).map((item) => (
                        <Product>
                            <ProductDetail>
                                <Pic src={item.product.image} alt="" />
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> {JSON.stringify(item.product.name)}
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> {item.product.id}
                                    </ProductId>
                                    <ProductColor color={item.product.color} />
                                    <ProductSize>
                                        <b>Size:</b>{item.product.size}
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <RemoveIcon onClick={()=>{ updateProductQuantityInCart(item.product.id, item.itemQuantity - 1) }}/>
                                    <ProductAmount>{item.itemQuantity}</ProductAmount>
                                    <AddIcon onClick={() => { addToCart(item.product.id) }} />
                                </ProductAmountContainer>

                                <ProductPrice>$ {item.product.price * item.itemQuantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                           )) }
                        <Hr />
                       
                    </About>
                    <CustomSummary>
                    <CustomSummaryTitle>ORDER SUMMARY</CustomSummaryTitle>
                    <CustomSummaryItem>
                        <CustomSummaryItemText>Subtotal</CustomSummaryItemText>
                        <CustomSummaryItemPrice>$ {shoppingCart.total}</CustomSummaryItemPrice>
                    </CustomSummaryItem>
                    {shoppingCart.total <= 50 && (
                        <CustomSummaryItem>
                            <CustomSummaryItemText>Estimated Shipping</CustomSummaryItemText>
                            <CustomSummaryItemPrice>$ 5.90</CustomSummaryItemPrice>
                        </CustomSummaryItem>
                    )}
                    {shoppingCart.total <= 50 && (
                        <CustomSummaryItem type="total">
                            <CustomSummaryItemText>Total (including shipping)</CustomSummaryItemText>
                            <CustomSummaryItemPrice>$ {shoppingCart.total + 5.90}</CustomSummaryItemPrice>
                        </CustomSummaryItem>
                    )}
                    {shoppingCart.total > 50 && (
                        <CustomSummaryItem>
                            <CustomSummaryItemText>Shipping Discount</CustomSummaryItemText>
                            <CustomSummaryItemPrice>$ -5.90</CustomSummaryItemPrice>
                        </CustomSummaryItem>
                    )}
                    {shoppingCart.total > 50 && (
                        <CustomSummaryItem type="total">
                            <CustomSummaryItemText>Total</CustomSummaryItemText>
                            <CustomSummaryItemPrice>$ {shoppingCart.total}</CustomSummaryItemPrice>
                        </CustomSummaryItem>
                    )}
                      {/* <StripeCheckout 
  name="QUIRKY CART"
  image="https://images.unsplash.com/photo-1679331417433-795c3d411ba4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fF84ekZIdWhSaHlvfHxlbnwwfHx8fHw%3D"
  billingAddress
  shippingAddress
  description={`Your total is $${shoppingCart.total <= 50 ? shoppingCart.total + 5.90 : shoppingCart.total}`}
  amount={(shoppingCart.total <= 50 ? (shoppingCart.total + 5.90) : shoppingCart.total) * 100}
  token={onToken}
  stripeKey={KEY}
/> */}
   <CustomButton>CHECKOUT NOW</CustomButton>
                </CustomSummary>

                </End>
            </Box>
            <Footer />
        </Container>
    );
};

export default ShoppingCart
