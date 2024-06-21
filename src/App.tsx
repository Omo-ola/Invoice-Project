import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import InvoiceItem from "./ui/InvoiceItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditInvoice from "./pages/EditInvoice";
import UserProfile from "./ui/UserProfile";
import PageNotFound from "./ui/PageNotFound";
import AppLayout from "./AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { FilterProvider } from "./context/FilterContext";

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
      <FilterProvider>
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>

            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="/home" />} />
                  <Route path="/home" element={<Layout />} />
                  <Route path="/invoice/:id" element={<InvoiceItem />} />
                  <Route path="/invoice/edit/:id" element={<EditInvoice />} />
                  <Route path="/user/profile/" element={<UserProfile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>

            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 2500,
                },
                error: {
                  duration: 3000,
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
        </DarkModeProvider>
      </FilterProvider>
    </>
  );
}

export default App;
