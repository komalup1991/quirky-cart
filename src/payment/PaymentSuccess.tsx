import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loggedInUserRequest } from "../auth/AllApi";
import { ProductInterface } from "../redux/productRedux";

interface UserState {
  currentUser: any;
}

interface AppState {
  user: UserState;
}

const PaymentSuccess = () => {
  const location = useLocation();
  console.log(location);
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state: AppState) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await loggedInUserRequest.post("/orders", {
          userId: currentUser.id,
          products: cart.products.map((item: ProductInterface) => ({
            productId: item.id,
            quantity: item.stockQuantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data.id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
