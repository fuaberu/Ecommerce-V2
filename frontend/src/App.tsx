import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
          {/* protected paths */}
          <Fragment>
            <Route
              path="account"
              element={
                user.user ? <ProfilePage /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="orders"
              element={
                user.user ? <OrdersPage /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="orders/:id"
              element={
                user.user ? (
                  <OrderDetailesPage />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="checkout" element={<CheckOutSteps />}>
              <Route
                path="shipping"
                element={
                  user.user ? (
                    <ShippingPage />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route
                path="order"
                element={
                  user.user ? (
                    <ConfirmOrder />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route
                path="payment"
                element={
                  user.user ? <PaymentPage /> : <Navigate replace to="/login" />
                }
              />
            </Route>
            <Fragment>
              <Route
                path="dashboard"
                element={
                  user.user && user.user.role === "admin" ? (
                    <Dashboard />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              >
                <Route
                  path="products"
                  element={
                    user.user && user.user.role === "admin" ? (
                      <ProductsBoard />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
                <Route
                  path="products/new"
                  element={
                    user.user && user.user.role === "admin" ? (
                      <NewProductPage />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
                <Route
                  path="users"
                  element={
                    user.user && user.user.role === "admin" ? (
                      <UsersBoard />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
                <Route
                  path="orders"
                  element={
                    user.user && user.user.role === "admin" ? (
                      <OrdersBoard />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
                <Route
                  path="reviews"
                  element={
                    user.user && user.user.role === "admin" ? (
                      <ReviewsBoard />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
              </Route>
            </Fragment>
          </Fragment>

          <Route path="cart" element={<CartPage />} />
          {/* //shiping layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
