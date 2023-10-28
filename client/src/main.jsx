import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Product from "./pages/Product";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
