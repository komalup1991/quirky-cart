import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CleanHands, DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers, deleteUser } from '../auth/ApiCalls';
import { RootState } from '../redux/store';
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import { GridRenderCellParams } from '@mui/x-data-grid';




// Styled components
const UserList = styled.div`
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
const Right = styled.div`
    flex: 4;
    `;
    const Box = styled.div`
    display: flex;`;
export default function AllUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    deleteUser(id, dispatch);
  };


    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "user",
          headerName: "User",
          width: 200,
          renderCell: (params:any) => (
              <UserListItem>
                <UserListImg  src={params.row.avatar} alt="" />
                {params.row.username}
              </UserListItem>
            ),
        },
        { field: "email", headerName: "Email", width: 200 },
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
            field: "role",
            headerName: "Role",
            width: 160,
          },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params:any) =>  (
              <>
                <Link to={`/user/${params.row.id}`}>
                    <UserListEditButton>Edit</UserListEditButton>
                </Link>
                <UserListDeleteIcon onClick={() => handleDelete(params.row.id)} />
              </>
          ),
        },
      ];

  return (
    <div>

   
    <Navbar/>
    <AdminNavbar/>
    <Box>
        <Left>
        <AdminSidebar/>
        </Left>
        <Right>
        <UserList>
      <DataGrid
        rows={users}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        // pageSize={8}
        checkboxSelection
      />
    </UserList>
        </Right>

    </Box>
    
    </div>
  );
}
