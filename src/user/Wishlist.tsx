import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import ProductDetail from "../components/ProductDetail";
import { getWishlist } from "../auth/ApiCalls";
import { RootState } from "../redux/store";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems,
  );
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  const productList = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    getWishlist(dispatch, userId);
  }, [dispatch, userId]);

  return (
    <div>
      <Navbar />
      <h2>MY WISHLIST</h2>
      <Container>
        {wishlistItems.map((wishlistItem) => {
          // Find the product in productList that matches the wishlistItem's productId
          const product = productList.find(
            (product) =>
              product.id.toString() === wishlistItem.productId.toString(),
          );

          // Only render the ProductDetail if a matching product is found
          return product ? (
            <ProductDetail
              key={wishlistItem.productId} // Ensure keys are unique and consistent
              item={product}
            />
          ) : null; // Render nothing if no product is found (or handle as needed)
        })}
      </Container>
    </div>
  );
};

export default Wishlist;
