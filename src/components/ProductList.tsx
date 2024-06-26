import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductDetail from "./ProductDetail";
import axios from "axios";
import { ProductInterface } from "../redux/productRedux";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const API = `${BASE_API_URL}/api/`;
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

const ProductList: React.FC<ProductListProps> = ({
  category,
  filters,
  sort,
}) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState<ProductInterface[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category ? `${API}products?category=${category}` : `${API}products`,
        );

        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilterProducts(
        products.filter((item: ProductInterface[]) =>
          Object.entries(filters).every(([key, value]) =>
            (item as any)[key].includes(value),
          ),
        ),
      );
  }, [products, category, filters]);

  //   useEffect(() => {
  //     if (sort === "latest") {
  //       setFilterProducts(
  //         [...filterProducts].sort(
  //           (x, y) =>
  //             new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime(),
  //         ),
  //       );
  //     } else if (sort === "asc") {
  //       setFilterProducts((prev) => [...prev].sort((x, y) => x.price - y.price));
  //     } else {
  //       setFilterProducts((prev) => [...prev].sort((x, y) => y.price - x.price));
  //     }
  //   }, [filterProducts, sort]);

  return (
    <Container>
      {category
        ? filterProducts.map((item: ProductInterface) => (
            <ProductDetail
              item={item}
              key={item.id}
            />
          ))
        : products.slice(0, 8).map((item: ProductInterface) => (
            <ProductDetail
              item={item}
              key={item.id}
            />
          ))}
    </Container>
  );
};

export default ProductList;
