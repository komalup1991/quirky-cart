import React from 'react'
import styled from 'styled-components'

const Container = styled.div` 
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1506792006437-256b665541e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNvbG9yZnVsJTIwdHJpbmtldHMlMjBzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
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
`;

const Disclaimer = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Register = () => {
  return (
   <Container>
    <Box>
        <Heading>
            CREATE ACCOUNT
        </Heading>
        <Form>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Input type="text" placeholder="First Name" />
            <Input type="text" placeholder="Last Name" />
            <Input type="text" placeholder="Role" />
            <Input type="email" placeholder="Email" />
            <Disclaimer>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Disclaimer>

            <Button>REGISTER</Button>
        </Form>
    </Box>
   </Container>  
   )
}

export default Register