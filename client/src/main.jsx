import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Order from "./pages/Order";

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
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/signup",
      //   element: <Signup />,
      // },
      {
        path: "/product/:id",
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
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
