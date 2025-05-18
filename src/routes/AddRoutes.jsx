import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Portfolio from "../pages/Portfolio";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portfolio />,
    errorElement: <NotFound />,
  },
]);

const AddRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AddRoutes;
