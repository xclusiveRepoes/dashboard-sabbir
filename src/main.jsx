import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import DropDownAsk from "./components/DropDownAsk.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import Pagination from "./Pagination.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Pagination />
    <DropDownAsk />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </Provider>
);
