import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SummaryApi from "./common/SummaryApi";
import CartMobileLink from "./components/CartMobile";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import GlobalProvider from "./provider/GlobalProvider";
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

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem()
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <GlobalProvider>
        <Header />
        <main className="min-h-[78vh]">
          <Outlet />
        </main>
        <Toaster />
        {location.pathname !== "/checkout" && <CartMobileLink />}
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
