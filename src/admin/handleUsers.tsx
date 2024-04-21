import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PermIdentity, CalendarToday, PhoneAndroid, MailOutline, LocationSearching, Publish } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { User } from '../redux/userRedux';

const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Show = styled.div`
  flex: 1;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Update = styled.div`
  flex: 2;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Bottom = styled.div`
  margin-top: 20px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const InfoTitle = styled.span`
  margin-left: 10px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Input = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const UpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
`;

const UpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;
const Left = styled.div`
    flex: 1;
    `;
const Right = styled.div`
    flex: 4;
    `;
const Box = styled.div`
    display: flex;`;
const HandleUsers: React.FC = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const users = useSelector((state: RootState) => state.user.users);
  const user = users.find((u: User) => JSON.stringify(u.id) === userId);
  return (
    <div>
       <Navbar/>
    <AdminNavbar/>
    <Box>
        <Left>
        <AdminSidebar/>
        </Left>
        <Right>
    <UserContainer>
      <TitleContainer>
        <h1 className="userTitle">Edit User</h1>
        <Link to="/addUser">
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Container>
        <Show>
          <Top>
            <Image src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
            <TopTitle>
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </TopTitle>
          </Top>
          <Bottom>
            <span className="userShowTitle">Account Details</span>
            <Info>
              <PermIdentity className="userShowIcon" />
              <InfoTitle>annabeck99</InfoTitle>
            </Info>
            <Info>
              <CalendarToday className="userShowIcon" />
              <InfoTitle>10.12.1999</InfoTitle>
            </Info>
            <span className="userShowTitle">Contact Details</span>
            <Info>
              <PhoneAndroid className="userShowIcon" />
              <InfoTitle>+1 123 456 67</InfoTitle>
            </Info>
            <Info>
              <MailOutline className="userShowIcon" />
              <InfoTitle>{user?.email}</InfoTitle>
            </Info>
            <Info>
              <LocationSearching className="userShowIcon" />
              <InfoTitle>New York | USA</InfoTitle>
            </Info>
          </Bottom>
        </Show>
        <Update>
          <span className="userUpdateTitle">Edit</span>
          <Form>
            <div className="userUpdateLeft">
              <UpdateItem>
                <label>Username</label>
                <Input placeholder="Username" />
              </UpdateItem>
              <UpdateItem>
                <label>Full Name</label>
                <Input placeholder="Full Name" />
              </UpdateItem>
              <UpdateItem>
                <label>Email</label>
                <Input placeholder="Email" />
              </UpdateItem>
              <UpdateItem>
                <label>Phone</label>
                <Input placeholder="Phone" />
              </UpdateItem>
              <UpdateItem>
                <label>Address</label>
                <Input placeholder="Address" />
              </UpdateItem>
            </div>
            <UpdateRight>
              <Upload>
                <Image className="userUpdateImg" src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </Upload>
              <UpdateButton>Update</UpdateButton>
            </UpdateRight>
          </Form>
        </Update>
      </Container>
    </UserContainer>
    </Right>
    </Box>
    </div>
  );
}
export default HandleUsers;