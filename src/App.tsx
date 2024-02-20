import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./ui/Login";
import SignUp from "./ui/SignUp";
import InvoiceItem from "./ui/InvoiceItem";

const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: `/invoice/:id`, element: <InvoiceItem /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
