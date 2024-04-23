import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { register } from "./ApiCalls";
import { useNavigate } from "react-router-dom";

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
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 380px) {
    width: 75%;
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

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  margin: 20px 0;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border: none;
`;

const Disclaimer = styled.span`
  font-size: 12px;
  color: grey;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await register(dispatch, formData, navigate);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <Container>
      <Box>
        <Heading>CREATE ACCOUNT</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <Disclaimer>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Disclaimer>
          <Button type="submit">REGISTER</Button>
        </Form>
      </Box>
    </Container>
  );
};

export default Register;
