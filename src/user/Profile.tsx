import { PermIdentity, MailOutline } from '@mui/icons-material';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../redux/userRedux';
import { useEffect, useState } from 'react';
import { loggedInUserRequest } from '../auth/AllApi';
const Show = styled.div`
  flex: 4;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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
const UpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;
const Profile = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [user, setUsers] = useState<User | null>(null);
  useEffect(() => {
    const fetchUsers = async ()=>{
      try{
        const res = await loggedInUserRequest.get(`/users/${userId}`);
        setUsers(res.data);
        
      }catch(err){
        console.log(err)
      }
    }
    fetchUsers();
  },[userId]);

    //const user = useSelector((state: RootState) => state.user.currentUser);
   // console.log(`${user?.profilePic}`)
  return (
    <div>
         <Navbar/>
<Show>
    
    <Top>
     
      <Image src={user?.profilePic} alt="" />
      <TopTitle>
        <span className="userShowUsername">{user?.firstName} {user?.lastName} </span>
        
      </TopTitle>
    </Top>
    <Bottom>
      <span className="userShowTitle">Account Details</span>
      <Info>
        <PermIdentity className="userShowIcon" />
        <InfoTitle>{user?.username}</InfoTitle>
      </Info>
    
      <span className="userShowTitle">Contact Details</span>
     
      <Info>
        <MailOutline className="userShowIcon" />
        <InfoTitle>{user?.email}</InfoTitle>
      </Info>
      <Link to={`/user/update/${user?.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <UpdateButton>Update Profile</UpdateButton>
    </Link>
    
    </Bottom>
  </Show>
    </div>
    
  )
}

export default Profile