import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CleanHands, DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers, followUser, getUserList } from "../auth/ApiCalls";
import { RootState } from "../redux/store";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import AdminSidebar from "../components/adminComponents/AdminSidebar";
import { GridRenderCellParams } from "@mui/x-data-grid";

// Styled components
const UserListDisplay = styled.div`
  padding: 20px;
`;

const UserListItem = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
`;

const UserListEditButton = styled.button`
  margin-right: 10px;
`;

const UserListDeleteIcon = styled(DeleteOutline)`
  cursor: pointer;
  color: red;
`;
const Left = styled.div`
  flex: 1;
`;
const Middle = styled.div`
  flex: 4;
`;
const Right = styled.div`
  flex: 1;
`;
const Box = styled.div`
  display: flex;
`;
export default function UserList() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    getUserList(dispatch, currentUser?.id);
  }, [dispatch]);

  const followUnfollowUser = (id: string, isFollowing: boolean) => {
    followUser(dispatch, id, isFollowing);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "UserName",
      width: 200,
      renderCell: (params: any) => (
        <UserListItem>
          <UserListImg
            src={params.row.profilePic}
            alt=""
          />
          {params.row.username}
        </UserListItem>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <>
          {/* <Link to={`/user/updateUserProfile/${params.row.id}`}> */}
          <UserListEditButton
            onClick={() =>
              followUnfollowUser(params.row.id, params.row.isFollowing)
            }>
            {params.row.isFollowing ? "Unfollow" : "Follow"}
          </UserListEditButton>
          {/* </Link> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <Navbar />

      <Box>
        <Left></Left>
        <Middle>
          <UserListDisplay>
            <DataGrid
              rows={users.filter((user) => user.id !== currentUser?.id)}
              disableRowSelectionOnClick
              columns={columns}
              getRowId={(row) => row.id}
            />
          </UserListDisplay>
        </Middle>
        <Right></Right>
      </Box>
    </div>
  );
}
