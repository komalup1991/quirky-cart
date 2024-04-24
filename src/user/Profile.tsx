import { PermIdentity, MailOutline } from "@mui/icons-material";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Show = styled.div`
  width: 800px;
  padding: 20px;
  height: 600px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
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
  margin: 10px 0;
  color: #444;
`;

const InfoTitle = styled.span`
  margin-left: 10px;
`;

const UpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #001f3f;
  }
`;

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div>
      <Navbar />
      <Container>
        <Show>
          <Top>
            <Image
              src={user?.profilePic}
              alt="Profile"
            />
            <TopTitle>
              <h2>
                {user?.firstName} {user?.lastName}
              </h2>
              <p>{user?.username}</p>
            </TopTitle>
          </Top>
          <Bottom>
            <h3>Account Details</h3>
            <Info>
              <PermIdentity className="userShowIcon" />
              <InfoTitle>{user?.username}</InfoTitle>
            </Info>

            <h3>Contact Details</h3>
            <Info>
              <MailOutline className="userShowIcon" />
              <InfoTitle>{user?.email}</InfoTitle>
            </Info>

            <Link
              to={`/user/update/${user?.id}`}
              style={{ textDecoration: "none", textAlign: "center" }}>
              <UpdateButton>Update Profile</UpdateButton>
            </Link>
          </Bottom>
        </Show>
      </Container>
    </div>
  );
};

export default Profile;
