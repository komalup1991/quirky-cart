import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;



const FormContainer = styled.div`
flex: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  color: #666;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 150px;
  padding: 10px;
  border: none;
  background-color: #0056b3;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  align-self: start;
  &:hover {
    background-color: #004494;
  }
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const GenderInput = styled.input`
  margin-right: 10px;
`;

const GenderLabel = styled.label`
  margin-right: 20px;
  font-size: 16px;
`;
const Left = styled.div`
    flex: 1;
    `;
const Right = styled.div`
    flex: 4;
    `;
    const Box = styled.div`
    display: flex;`;

const addUser = () => {
  return (
    <div>
    <Navbar/>
 <AdminNavbar/>
 <Box>
     <Left>
     <AdminSidebar/>
     </Left>
     <Right>
        <FormContainer>
          <FormTitle>New User</FormTitle>
          <Form>
            <FormItem>
              <Label>Username</Label>
              <Input type="text" placeholder="john" />
            </FormItem>
            <FormItem>
              <Label>Full Name</Label>
              <Input type="text" placeholder="John Smith" />
            </FormItem>
            <FormItem>
              <Label>Email</Label>
              <Input type="email" placeholder="john@gmail.com" />
            </FormItem>
            <FormItem>
              <Label>Password</Label>
              <Input type="password" placeholder="password" />
            </FormItem>
            <FormItem>
              <Label>Phone</Label>
              <Input type="text" placeholder="+1 123 456 7890" />
            </FormItem>
            <FormItem>
              <Label>Address</Label>
              <Input type="text" placeholder="New York | USA" />
            </FormItem>
            <FormItem>
              <Label>Gender</Label>
              <GenderContainer>
                <GenderInput type="radio" name="gender" id="male" value="male" />
                <GenderLabel htmlFor="male">Male</GenderLabel>
                <GenderInput type="radio" name="gender" id="female" value="female" />
                <GenderLabel htmlFor="female">Female</GenderLabel>
                <GenderInput type="radio" name="gender" id="other" value="other" />
                <GenderLabel htmlFor="other">Other</GenderLabel>
              </GenderContainer>
            </FormItem>
            <FormItem>
              <Label>Active</Label>
              <Select>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormItem>
            <Button type="submit">Create</Button>
          </Form>
        </FormContainer>
      </Right>
      
    </Box>
    </div>
  );
}

export default addUser;
