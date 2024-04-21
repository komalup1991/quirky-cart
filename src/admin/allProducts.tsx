import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getProducts, deleteProduct } from '../auth/ApiCalls';
import { RootState } from '../redux/store';
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';




// Styled components
const ProductList = styled.div`
  padding: 20px;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
`;

const ProductListEditButton = styled.button`
  margin-right: 10px;
`;

const ProductListDeleteIcon = styled(DeleteOutline)`
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
export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    deleteProduct(id, dispatch);
  };
 

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params: any) => (
        <ProductListItem>
          <ProductListImg src={params.row.image} alt="" />
          {params.row.name}
        </ProductListItem>
      ),
    },
    { field: "stockQuantity", headerName: "Stock", width: 200 },
    { field: "price", headerName: "Price", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <>
          <Link to={`/product/${params.row.id}`}>
            <ProductListEditButton>Edit</ProductListEditButton>
          </Link>
          <ProductListDeleteIcon onClick={() => handleDelete(params.row.id)} />
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
        <ProductList>
      <DataGrid
        rows={products}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        // pageSize={8}
        checkboxSelection
      />
    </ProductList>
        </Right>

    </Box>
    
    </div>
  );
}
