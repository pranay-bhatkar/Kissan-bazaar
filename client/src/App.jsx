import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import SummaryApi from "./common/SummaryApi";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("accesstoken");
    if (!token) return;

    try {
      const userData = await fetchUserDetails();
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios(SummaryApi.getCategory);
      const { data } = response;

      if (data.success) {
        dispatch(
          setAllCategory(data.data.sort((a, b) => a.name.localeCompare(b.name)))
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios(SummaryApi.getSubCategory);
      const { data } = response;

      if (data.success) {
        dispatch(
          setAllSubCategory(
            data.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // You can also add fetchCartItems here if needed
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="pt-16 sm:pt-20 min-h-screen w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
