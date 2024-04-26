import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../auth/ApiCalls";
import { RootState } from "../redux/store";
import { checkWishlistStatus } from "../redux/wishlistRedux";
import { ProductInterface } from "../redux/productRedux";
import { loggedInUserRequest, publicRequest } from "../auth/AllApi";
import { addProduct } from "../redux/shoppingCartRedux";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const API = `${BASE_API_URL}/api/`;
const Details = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px; /* Increased height to accommodate details */
  display: flex;
  flex-direction: center;
  justify-content: center;
  position: relative;
  background-color: #f5fbfd;
  &:hover ${Details} {
    opacity: 1;
  }
`;

const Pic = styled.img`
  height: 75%;
  z-index: 2;
`;

const IconList = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Bubble = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Info = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const Name = styled.h3`
  margin: 0;
  color: #333;
`;

const Price = styled.span`
  color: green;
`;

interface ProductProps {
  item: ProductInterface;
}

const useWishlistItemId = (productId?: number, userId?: number) => {
  return useSelector((state: RootState) => {
    const item = state.wishlist.wishlistItems.find(
      (item) => item.productId === productId && item.userId === userId,
    );
    return item?.id;
  });
};

const ProductDetail: React.FC<ProductProps> = ({ item }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.currentUser?.id);
  const wishlistItemId = useWishlistItemId(parseInt(item.id), userId);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistItemId !== undefined) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlistItemId]);

  useEffect(() => {
    if (userId) {
      dispatch(checkWishlistStatus(parseInt(item.id)));
    }
  }, [item.id, userId, dispatch]);

  const handleToggleWishlist = async () => {
    if (isInWishlist) {
      await removeFromWishlist(dispatch, wishlistItemId, userId);
    } else {
      await addToWishlist(dispatch, userId, parseInt(item.id));
    }
    setIsInWishlist(!isInWishlist);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${item.id}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [item.id]);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [products, setProducts] = useState<ProductInterface | null>(null);
  const quantity = 1;
  const addToCart = async () => {
    const res = await loggedInUserRequest.post(
      `${API}cart/c/addToCart/userId=${user?.id}/productId=${item.id}`,
      { quantity: 1 },
    );

    dispatch(addProduct({ ...products, quantity }));
  };
  return (
    <Container>
      <Bubble />
      <Pic src={item.image} />
      <Info>
        <Name>{item.name}</Name>
        <div>ID: {item.id}</div>
        <Price>${item.price}</Price>
      </Info>
      <Details>
        <IconList>
          <Link to={`/product/${item.id}`}>
            <Search />
          </Link>
        </IconList>
        <IconList>
          <ShoppingCartIcon onClick={addToCart} />
        </IconList>
        <IconList onClick={handleToggleWishlist}>
          {isInWishlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconList>
      </Details>
    </Container>
  );
};

export default ProductDetail;
