import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';
const AddUser = styled.div` {
    flex: 4;
  }`;
  
 const AddUserForm = styled.form` {
    display: flex;
    flex-wrap: wrap;
  }`;
  
  const AddUserItem = styled.div` {
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
  }`;
  
  const AddUserItemLabel= styled.label` {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
  }`;
  
  const AddUserItemInput = styled.input` {
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }`;
  
const AddUserGenderInput = styled.input`
    margin-top: 15px;
    `;
  
const AddUserGenderLabel = styled.label`
      margin: 10px;
      font-size: 18px;
      color: #555;
  `;
  
const AddUserSelect = styled.select`
      height: 40px;
      border-radius: 5px;
`;
  
const AddUserButton = styled.button`
      width: 200px;
      border: none;
      background-color: darkblue;
      color: white;
      padding: 7px 10px;
      font-weight: 600;
      border-radius: 10px;
      margin-top: 30px;
      cursor: pointer;
`;
const Left = styled.div`
    flex: 1;
    `;
const Right = styled.div`
    flex: 4;
    `;
    const Box = styled.div`
    display: flex;`;
const NewUserGender = styled.div`
    display: flex;
    align-items: center;
    `;
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
    <AddUser>
    <h1 className="newUserTitle">New User</h1>
    <AddUserForm>
      <AddUserItem>
        <AddUserItemLabel>Username</AddUserItemLabel>
        <AddUserItemInput type="text" placeholder="john" />
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Full Name</AddUserItemLabel>
        <AddUserItemInput type="text" placeholder="John Smith" />
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Email</AddUserItemLabel>
        <AddUserItemInput type="email" placeholder="john@gmail.com" />
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Password</AddUserItemLabel>
        <AddUserItemInput type="password" placeholder="password" />
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Phone</AddUserItemLabel>
        <AddUserItemInput type="text" placeholder="+1 123 456 78" />
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Address</AddUserItemLabel>
        <AddUserItemInput type="text" placeholder="New York | USA" />
      </AddUserItem>
      <AddUserItem>
        <AddUserGenderLabel>Gender</AddUserGenderLabel>
        <NewUserGender>
          <AddUserGenderInput type="radio" name="gender" id="male" value="male" />
          <AddUserGenderLabel htmlFor="male">Male</AddUserGenderLabel>
          <AddUserGenderInput type="radio" name="gender" id="female" value="female" />
          <AddUserGenderLabel htmlFor="female">Female</AddUserGenderLabel>
          <AddUserGenderInput type="radio" name="gender" id="other" value="other" />
          <AddUserGenderLabel htmlFor="other">Other</AddUserGenderLabel>
        </NewUserGender>
      </AddUserItem>
      <AddUserItem>
        <AddUserItemLabel>Active</AddUserItemLabel>
        <AddUserSelect>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </AddUserSelect>
      </AddUserItem>
      <AddUserButton>Create</AddUserButton>
    </AddUserForm>
  </AddUser>
  </Right>
    </Box>
    </div>
  )
}

export default addUser