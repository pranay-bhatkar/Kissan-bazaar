import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DirectBuyFromFarmers from "../components/DirectBuyFromFarmers";
import SubscriptionPage from "../components/SubscriptionPage";
import AdminPermision from "../layouts/AdminPermision";
import Dashboard from "../layouts/Dashboard";
import Address from "../pages/Address";
import Cancel from "../pages/Cancel";
import CartMobile from "../pages/CartMobile";
import CategoryPage from "../pages/CategoryPage";
import CheckoutPage from "../pages/CheckoutPage";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import NotFound from "../pages/NotFound";
import OtpVerification from "../pages/OtpVerification";
import ProductAdmin from "../pages/ProductAdmin";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ProductListPage from "../pages/ProductListPage";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import Success from "../pages/Success";
import UploadProduct from "../pages/UploadProduct";
import UserMenuMobile from "../pages/UserMenuMobile";
import AdminUserTable from "../pages/AdminUserTable";
import AdminOrderTable from "../pages/AdminOrderTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin-users",
            element: <AdminUserTable />,
          },
          {
            path: "admin-orders",
            element: <AdminOrderTable />,
          },

          {
            path: "myorders",
            element: <MyOrders />,
          },

          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <CategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <SubCategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermision>
                <UploadProduct />
              </AdminPermision>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermision>
                <ProductAdmin />
              </AdminPermision>
            ),
          },
        ],
      },
      //   {
      //     path: ":category",
      //     children: [
      //       {
      //         path: ":subCategory",
      //         element: <ProductListPage />,
      //       },
      //     ],
      //   },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobile />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "farmer/:id",
        element: <DirectBuyFromFarmers />,
      },
      {
        path: "/subscription",
        element: <SubscriptionPage />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: ":category/:subCategory",
        element: <ProductListPage />,
      },
    ],
  },
]);

export default router;
