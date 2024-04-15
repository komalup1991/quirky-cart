import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Notify from '../components/Notify';
import Footer from '../components/Footer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
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

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div<{ type?: string }>`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const ShoppingCart = () => {
    return (
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
                        <Product>
                            <ProductDetail>
                                <Pic src="https://images.unsplash.com/photo-1542556398-3c9a71885fab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG11Z3N8ZW58MHx8MHx8fDA%3D" />
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> FILL ME MUG
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> 93813718293
                                    </ProductId>
                                    <ProductColor color="white" />
                                    <ProductSize>
                                        <b>Size:</b> L
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon />
                                    <ProductAmount>2</ProductAmount>
                                    <RemoveIcon />
                                </ProductAmountContainer>
                                <ProductPrice>$ 30</ProductPrice>
                            </PriceDetail>
                        </Product>
                        <Hr />
                        <Product>
                            <ProductDetail>
                                <Pic src="https://images.unsplash.com/photo-1554200877-40aae1bb6ec1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fG11Z3N8ZW58MHx8MHx8fDA%3D" />
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> FUTURE MUG
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> 93813718293
                                    </ProductId>
                                    <ProductColor color="white" />
                                    <ProductSize>
                                        <b>Size:</b> L
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon />
                                    <ProductAmount>1</ProductAmount>
                                    <RemoveIcon />
                                </ProductAmountContainer>
                                <ProductPrice>$ 20</ProductPrice>
                            </PriceDetail>
                        </Product>
                    </About>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ 80</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ 80</SummaryItemPrice>
                        </SummaryItem>
                        <Button>CHECKOUT NOW</Button>
                    </Summary>
                </End>
            </Box>
            <Footer />
        </Container>
    );
};

export default ShoppingCart;
