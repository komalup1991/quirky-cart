import React from "react";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { Box, styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../redux/userRedux";

// Define the props for the UserList component
type UserListProps = {
  users?: User[];
};

// Styled components
const UserListImg = styled("img")({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginRight: "10px",
});

const UserListItem = styled("div")({
  display: "flex",
  alignItems: "center",
});

const UserListEditButton = styled("button")({
  padding: "5px 10px",
  cursor: "pointer",
});

// UserList Component
const UserListProp: React.FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate();
  const handleRowClick = (params: { id: any }) => {
    console.log("params.id: ", params.id);
    navigate(`/user/${params.id}`);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "UserName",
      width: 200,
      renderCell: (params: any) => (
        <UserListItem>
          <UserListImg
            src={
              params.row.profilePic
                ? params.row.profilePic
                : "https://www.shareicon.net/data/128x128/2016/05/24/770042_people_512x512.png"
            }
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
  ];

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <DataGrid
          rows={users}
          // disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row.id}
          onRowClick={handleRowClick}
          //   pageSize={5}
          //   rowsPerPageOptions={[5]}
          //   checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default UserListProp;
