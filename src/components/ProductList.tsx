import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductDetail from './ProductDetail'
import axios from 'axios';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
`;
interface ProductListProps {
    category: string;
    filters: {};
    sort: string;
  }

 export  interface ProductInterface {
    id: number;
    name: string;
    description: string;
    price: number;
    priceUnit: string;
    stockQuantity: number;
    category: string;
    color: string;
    size: string;
    image: string;
    rating: number;
    updatedAt: string;
    createdAt: string;
  }
const ProductList:React.FC<ProductListProps>= ({category, filters, sort}) => {
    // console.log(category, filters, sort);
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState<ProductInterface[]>([]);
    useEffect(()=>{
        const getProducts = async () => {
        try{
         

            const res = await axios.get(
                category ? 
                `http://localhost:4000/api/products?category=${category}`
                : 'http://localhost:4000/api/products'
           ); 
           
           setProducts(res.data);
        } catch(err){
        }
        };
        getProducts()
    },[category]);

    useEffect(()=>{
        category 
        && 
        setFilterProducts(
            products.filter((item:ProductInterface[])=> 
                Object.entries(filters).every(([key, value])=> 
                    (item as any)[key].includes(value)
                )
            )
        )  
            },[products,category,filters]);

    // useEffect(()=>{
    //     if (sort === 'latest'){
    //         setFilterProducts([...filterProducts].sort((x,y)=> 
    //         new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime()
    //         ));
    //     }
    //     else if(sort === 'asc'){
    //         setFilterProducts((prev)=>
    //         [...prev].sort((x,y)=>  x.price - y.price)
    //         );
    //     }
    //     else{
    //         setFilterProducts((prev)=>
    //         [...prev].sort((x,y)=>  y.price - x.price)
    //         );
    //     }
    //     },[filterProducts, sort]);
          
  return (
   <Container>
    {
        category?
        filterProducts.map((item: { id: React.Key | null | undefined; })=> (
            <ProductDetail item={item} key={item.id}/>
        ))
        : products
        .slice(0, 6)
        .map((item: { id: React.Key | null | undefined; })=><ProductDetail item={item} key={item.id}/>)
    }
   </Container>
  )
}

export default ProductList