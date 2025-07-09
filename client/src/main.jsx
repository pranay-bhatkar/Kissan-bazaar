import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./route/index";
import { store } from "./store/store.js";
import GlobalProvider from "./provider/GlobalProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </Provider>
  // </StrictMode>,
);
