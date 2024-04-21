import React, { useReducer, useState } from 'react'
import styled from 'styled-components'
import { login } from './ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Container = styled.div` 
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxjb2xvcmZ1bCUyMHRyaW5rZXRzJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    @media only screen and (max-width: 380px) {
        width: "75%"
      }
`;

const Heading = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Input = styled.input` 
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: grey;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 10px;
    &:disabled {
        background-color: lightgray;
        color: gray;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
  color: red;
`;





const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state:RootState) => state.user);
    console.log(isFetching);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        login(dispatch,{ username, password })
        console.log(`Submitting username ${username} and password ${password}`);
    };


  return (
    <Container>
        <Box>
        <Heading>
            SIGN IN
        </Heading>
        <Form>
            <Input 
            type="text" 
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            
            />
            <Input 
            type="password" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            
            />

            <Button onClick={handleSubmit} disabled={isFetching} >LOGIN</Button>
            {error && <Error>Something went wrong! Please try again..</Error>}
            
            <Link>FORGOT PASSWORD?</Link>
            <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
    </Box>
    </Container>
  )
}

export default Login