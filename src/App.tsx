import { Toaster } from "react-hot-toast";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Layout />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration:3000
          },
          error: {
            duration:5000
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color:"black"
          }
        }}
      />
    </>
  );
}

export default App;
