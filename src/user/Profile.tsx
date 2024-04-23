import { PermIdentity, MailOutline } from "@mui/icons-material";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Show = styled.div`
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Top = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 240px;
  height: 240px;
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
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div>
      <Navbar />
      <Show>
        <Top>
          <Image
            src={user?.profilePic}
            alt=""
          />
          <TopTitle></TopTitle>
        </Top>
        <Bottom>
          <span className="userShowTitle">Account Details</span>
          <Info>
            <span className="userShowUsername">
              <InfoTitle>{user?.firstName}</InfoTitle>
            </span>
          </Info>
          <Info>
            <span className="userShowUsername">
              <InfoTitle>{user?.lastName}</InfoTitle>
            </span>
          </Info>

          <Info>
            <PermIdentity className="userShowIcon" />
            <InfoTitle>{user?.username}</InfoTitle>
          </Info>

          <span className="userShowTitle">Contact Details</span>

          <Info>
            <MailOutline className="userShowIcon" />
            <InfoTitle>{user?.email}</InfoTitle>
          </Info>
          <Link
            to={`/user/update/${user?.id}`}
            style={{ textDecoration: "none", color: "black" }}>
            <UpdateButton>Update Profile</UpdateButton>
          </Link>
        </Bottom>
      </Show>
    </div>
  );
};

export default Profile;
