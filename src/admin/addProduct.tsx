import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { ProductInterface } from '../redux/productRedux';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addProduct as reduxAddProduct } from "../auth/ApiCalls";
import { useDispatch } from "react-redux";
import AdminNavbar from '../components/adminComponents/AdminNavbar';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/adminComponents/AdminSidebar';

interface ProductInputs {
    name?: string;
    description?: string;
    price?: number;
    inStock?: boolean;
    image?: string;
    category?: string;
    stockQuantity?: number;
    size?: string;
    color?: string;
}

const NewProduct = styled.div`
flex: 4;
margin-left: 100px;
`;

const AddProductForm = styled.form`
margin-top: 10px;
`; 

const AddProductDetail = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;
  
const AddProductDetailLabel = styled.label`
color: gray;
font-weight: 600;
margin-bottom: 10px;
`;

const AddProductDetailInput = styled.input`
padding: 10px;
`; 

const AddProductDetailSelect = styled.select`
padding: 10px;
`; 

const AddProductDetailButton = styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
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
const AddProduct = () => {
    const [inputs, setInputs] = useState<ProductInputs>({});
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? parseInt(value, 10) : value;
        setInputs(prev => ({ ...prev, [name]: val }));
    };

    const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!file) return;
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.error(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const product: ProductInterface  = {
                    name: inputs.name || '',
                    description: inputs.description || '',
                    price: Number(inputs.price) || 0,
                    image: downloadURL,
                    category: inputs.category || '',
                    stockQuantity: inputs.stockQuantity || 0,
                    size: inputs.size || '',
                    color: inputs.color || '',
                    id: '',
                    rating: 0
                };
                reduxAddProduct(product, dispatch);
              });
            }
        );
    };

    return (
        <div>
             <Navbar/>
            <AdminNavbar/>
            <Box>
        <Left>
        <AdminSidebar/>
        </Left>
        <Right>
<NewProduct>
           
            <h1 className="addProductTitle">New Product</h1>
            <AddProductForm>
                <AddProductDetail>
                    <AddProductDetailLabel>Image</AddProductDetailLabel>
                    <AddProductDetailInput
                        type="file"
                        id="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files && e.target.files[0])}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Name</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="name"
                        type="text"
                        placeholder="Product Name"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Description</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="description"
                        type="text"
                        placeholder="Product Description"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Price</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="price"
                        type="number"
                        placeholder="Product Price"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Category</AddProductDetailLabel>
                    <AddProductDetailSelect name="category" onChange={handleChange}>
                        <option value="mug">Mug</option>
                        <option value="bag">Bag</option>
                        <option value="keyring">Key Ring</option>
                    </AddProductDetailSelect>
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Stock Quantity</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="stockQuantity"
                        type="number"
                        placeholder="Stock Quantity"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Size</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="size"
                        type="text"
                        placeholder="Size (e.g., S, M, L)"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>Color</AddProductDetailLabel>
                    <AddProductDetailInput
                        name="color"
                        type="text"
                        placeholder="Color (e.g., Red, Blue)"
                        onChange={handleChange}
                    />
                </AddProductDetail>
                <AddProductDetail>
                    <AddProductDetailLabel>In Stock</AddProductDetailLabel>
                    <AddProductDetailSelect name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </AddProductDetailSelect>
                </AddProductDetail>
                <AddProductDetailButton onClick={handleClick} className="addProductButton">
                    Create
                </AddProductDetailButton>
            </AddProductForm>
        </NewProduct>
        </Right>

</Box>
        </div>
        
    );
};

export default AddProduct;
