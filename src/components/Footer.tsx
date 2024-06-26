import React, { useContext } from "react";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import BusinessIcon from "@mui/icons-material/Business";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 380px) {
    flexdirection: "column";
  }
`;

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const MiddlePart = styled.div`
  flex: 1;
  @media only screen and (max-width: 380px) {
    display: "none";
  }
`;

const Heading = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const RightPart = styled.div`
  flex: 1;
  @media only screen and (max-width: 380px) {
    backgroundcolor: "#fff8f8";
  }
`;

const Logo = styled.h1``;
const About = styled.p`
  margin: 20px 0px;
`;
const Contact = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Connect = styled.ul`
  display: flex;
`;
const Icons = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: black;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Pay = styled.img`
  width: 50%;
`;

const Footer = () => {
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  return (
    <Container>
      <LeftPart>
        <Logo>QUIRKY CART.</Logo>
        <About>
          Quirky Cart is your one-stop destination for all things delightfully
          eccentric! From mugs adorned with witty puns to keyrings that double
          as tiny works of art, each product is carefully curated to add a dash
          of whimsy to your daily life. Whether you're sipping your morning brew
          from a mug that sparks joy or adding a touch of charm to your keys
          with a quirky keyring, Quirky Cart has something to make every moment
          a little more extraordinary. So, why settle for ordinary when you can
          embrace the delightfully quirky with Quirky Cart?
        </About>
        <Connect>
          <Icons color="E4405F">
            <InstagramIcon />
          </Icons>
          <Icons color="3B5999">
            <FacebookIcon />
          </Icons>
          <Icons color="E60023">
            <PinterestIcon />
          </Icons>
        </Connect>
      </LeftPart>
      <MiddlePart>
        <Heading>Useful Links</Heading>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="/shoppingCart">Cart</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/mug">Mugs</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/bag">Bags</Link>
          </ListItem>
          <ListItem>
            <Link to="/products/keyring">Key rings</Link>
          </ListItem>
          <ListItem>
            <Link to={`/user/${userId}`}>My Account</Link>
          </ListItem>
          <ListItem>
            <Link to="">Order Tracking</Link>
          </ListItem>
          <ListItem>
            <Link to="/wishlist">Wishlist</Link>
          </ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </MiddlePart>
      <RightPart>
        <Heading>Contact</Heading>
        <Contact>
          <BusinessIcon style={{ marginRight: "10px" }} /> California
        </Contact>
        <Contact>
          <PhonelinkRingIcon style={{ marginRight: "10px" }} /> +1 234 56 78
        </Contact>
        <Contact>
          <AlternateEmailIcon style={{ marginRight: "10px" }} />{" "}
          upadhyay.ko@northeastern.edu
        </Contact>
        <Pay src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </RightPart>
    </Container>
  );
};

export default Footer;
