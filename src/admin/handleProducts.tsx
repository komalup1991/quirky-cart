import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loggedInUserRequest } from '../auth/AllApi';
import { RootState } from '../redux/store';
import { ProductInterface } from '../redux/productRedux';
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/adminComponents/AdminNavbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';

// Styled components
const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const ProductTop = styled.div`
  display: flex;
`;

const ProductTopLeft = styled.div`
  flex: 1;
`;

const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;

const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const ProductInfoValue = styled.span`
  font-weight: 300;
`;

const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: gray;
`;

const Input = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`;

const Select = styled.select`
  margin-bottom: 10px;
`;

const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;

const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
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


type StatsItem = {
  id: number;
  total: number;
};

const HandleProducts: React.FC = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  console.log(productId);
  const [pStats, setPStats] = useState<Array<{ name: string; Sales: number }>>([]);
  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((p: ProductInterface) => JSON.stringify(p.id) === productId);

  const MONTHS = useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await loggedInUserRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a: { id: number; },b: { id: number; })=>{
            return a.id - b.id
        })
        list.map((item: { _id: number; total: any; }) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);


  return (
    <div>
       <Navbar/>
    <AdminNavbar/>
    <Box>
        <Left>
        <AdminSidebar/>
        </Left>
        <Right>
      <ProductContainer>
      <ProductTitleContainer>
        <h1>Product</h1>
        <Link to="/addProduct">
          <ProductAddButton>Create</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <ProductTopLeft>
          {/* Placeholder for Chart component */}
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg src={product?.image || ''} alt="" />
            <ProductName>{product?.name}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <span>id:</span>
              <ProductInfoValue>{product?.id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <span>sales:</span>
              <ProductInfoValue>{/* Placeholder for sales value */}</ProductInfoValue>
            </ProductInfoItem>
            {/* <ProductInfoItem>
              <span>in stock:</span>
              <ProductInfoValue>{product?.inStock ? 'Yes' : 'No'}</ProductInfoValue>
            </ProductInfoItem> */}
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <Label>Product Name</Label>
            <Input type="text" placeholder={product?.name} />
            <Label>Product Description</Label>
            <Input type="text" placeholder={product?.description} />
            <Label>Price</Label>
            {/* <Input type="number" placeholder={product?.price} /> */}
            {/* <Label>In Stock</Label>
            <Select name="inStock" id="idStock" defaultValue={product?.inStock ? 'true' : 'false'}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select> */}
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg src={product?.image || ''} alt="" />
              <Label htmlFor="file">Upload</Label>
              <Input type="file" id="file" style={{ display: "none" }} />
            </ProductUpload>
            <ProductButton>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </ProductContainer>
    </Right>
    </Box>
    </div>
    
  );
}

export default HandleProducts;
