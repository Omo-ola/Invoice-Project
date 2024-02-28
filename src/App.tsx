import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./ui/Login";
import SignUp from "./ui/SignUp";
import InvoiceItem from "./ui/InvoiceItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditInvoice from "./ui/EditInvoice";
import UserProfile from "./ui/UserProfile";

const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: `/invoice/:id`, element: <InvoiceItem /> },
  { path: `/invoice/edit/:id`, element: <EditInvoice /> },
  { path: `/user/profile/`, element: <UserProfile /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
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
      </QueryClientProvider>
    </>
  );
}

export default App;
