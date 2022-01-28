import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLoadUserMutation } from "./app/sevices/user";
import { RootState } from "./app/store";
import CheckOutSteps from "./components/order/CheckOutSteps";
import Spinner from "./components/smallComponents/Spinner";
import GlobalStyle from "./globalStyles/GlobalStyle";

//components
import Layout from "./layouts/Layout";
import CartPage from "./pages/CartPage";
import ConfirmOrder from "./pages/ConfirmOrder";
import Dashboard from "./pages/dashboard/Dashboard";
import NewProductPage from "./pages/dashboard/NewProductPage";
import OrdersBoard from "./pages/dashboard/OrdersBoard";
import ProductsBoard from "./pages/dashboard/ProductsBoard";
import ReviewsBoard from "./pages/dashboard/ReviewsBoard";
import UsersBoard from "./pages/dashboard/UsersBoard";
import Homepage from "./pages/Homepage";
import LoginSignUp from "./pages/LoginSignUp";
import NotFound from "./pages/NotFound";
import OrderDetailesPage from "./pages/OrderDetailesPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetailePage from "./pages/ProductDetailePage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";

function App() {
  const [loadUser, { isLoading: loadingUser, error: loadError }] =
    useLoadUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();

    if (loadError) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((state: RootState) => state.user);

  if (loadingUser) return <Spinner />;
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path=":productId" element={<ProductDetailePage />} />
          <Route path="login" element={<LoginSignUp />} />
          <Route path="products" element={<ProductsPage />} />
          {user.user && (
            //protected paths
            <Fragment>
              <Route path="account" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailesPage />} />
              <Route path="checkout" element={<CheckOutSteps />}>
                <Route path="shipping" element={<ShippingPage />} />
                <Route path="order" element={<ConfirmOrder />} />
                <Route path="payment" element={<PaymentPage />} />
              </Route>
              {user.user.role === "admin" && (
                <Fragment>
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route path="products" element={<ProductsBoard />} />
                    <Route path="products/new" element={<NewProductPage />} />
                    <Route path="users" element={<UsersBoard />} />
                    <Route path="orders" element={<OrdersBoard />} />
                    <Route path="reviews" element={<ReviewsBoard />} />
                  </Route>
                </Fragment>
              )}
            </Fragment>
          )}

          <Route path="cart" element={<CartPage />} />
          {/* //shiping layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
