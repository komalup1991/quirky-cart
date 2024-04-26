import { PermIdentity, MailOutline } from "@mui/icons-material";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getFollowers, getFollowing, getUserProfile } from "../auth/ApiCalls";
import UserListProp from "./UserListProp";
import { Box } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Show = styled.div`
  width: 800px;
  padding: 20px;
  height: 600px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
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

const FollowButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  background-color: darkblue;
  font-weight: 600;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #001f3f;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const id = useLocation().pathname.split("/")[2];
  const user = userState.profileUser;
  const isLoggedInUser = userState.currentUser?.id === user?.id;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  console.log("currentUser", currentUser?.firstName);
  const following = userState.following.filter((f) => f.id === user?.id);
  const isFollowing = following.length > 0;

  useEffect(() => {
    // console.log("useEffect called getUserProfile:= ", id);
    getUserProfile(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    console.log("useEffect called ff:= ", id);
    getFollowing(dispatch, parseInt(id));
    getFollowers(dispatch, parseInt(id));
  }, [dispatch, id]);

  return (
    <Box>
      <Navbar />
      <Container>
        <Show>
          <Top>
            <Image
              src={
                user?.profilePic
                  ? user?.profilePic
                  : "https://www.shareicon.net/data/128x128/2016/05/24/770042_people_512x512.png"
              }
              // alt="Profile"
            />
            <TopTitle>
              <h2>
                {user?.firstName} {user?.lastName}
              </h2>
              <p>{user?.username}</p>
              {/* {!isLoggedInUser ? (
                <FollowButton>
                  {isFollowing ? "Unfollow" : "Follow"}
                </FollowButton>
              ) : (
                ""
              )} */}
            </TopTitle>
          </Top>
          <Bottom>
            <h3>Account Details</h3>
            <Info>
              <PermIdentity className="userShowIcon" />
              <InfoTitle>{user?.username}</InfoTitle>
            </Info>

            {isLoggedInUser ? (
              <>
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
              </>
            ) : (
              ""
            )}
            {currentUser ? (
              <>
                <h3>Following</h3>
                {userState.following.length > 0 ? (
                  <UserListProp users={userState.following} />
                ) : (
                  "Not following anyone!"
                )}
                <h3>Followers</h3>
                {userState.followers.length > 0 ? (
                  <UserListProp users={userState.followers} />
                ) : (
                  "No Followers yet!"
                )}
              </>
            ) : (
              ""
            )}
          </Bottom>
        </Show>
      </Container>
    </Box>
  );
};

export default Profile;
