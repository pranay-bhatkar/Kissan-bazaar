import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AxiosToastError from "../utils/AxiosToastError";

// Create context
export const GlobalContext = createContext(null);

// Custom hook with safety check
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);

  // Fetch Cart Items
  const fetchCartItem = async () => {
    try {
      const response = await Axios(SummaryApi.getCartItem);
      const { data } = response;
      if (data.success) {
        dispatch(handleAddItemCart(data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Update Cart Item Quantity
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id: id, qty },
      });
      const { data } = response;
      if (data.success) {
        fetchCartItem();
        return data;
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Delete Cart Item
  const deleteCartItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: id },
      });
      const { data } = response;
      if (data.success) {
        toast.success(data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Fetch Addresses
  const fetchAddress = async () => {
    try {
      const response = await Axios(SummaryApi.getAddress);
      const { data } = response;
      if (data.success) {
        dispatch(handleAddAddress(data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Fetch Orders
  const fetchOrder = async () => {
    try {
      const response = await Axios(SummaryApi.getOrderItems);
      const { data } = response;
      if (data.success) {
        dispatch(setOrder(data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Cart calculation
  useEffect(() => {
    const qty = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQty(qty);

    const price = cartItem.reduce((acc, item) => {
      const discounted = pricewithDiscount(
        item.productId?.price,
        item.productId?.discount
      );
      return acc + discounted * item.quantity;
    }, 0);
    setTotalPrice(price);

    const original = cartItem.reduce(
      (acc, item) => acc + item.productId?.price * item.quantity,
      0
    );
    setNotDiscountTotalPrice(original);
  }, [cartItem]);

  // Re-fetch on user change
  useEffect(() => {
    fetchCartItem();
    fetchAddress();
    fetchOrder();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        totalQty,
        totalPrice,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
