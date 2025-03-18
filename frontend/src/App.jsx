import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/mainLayout";
import Home from "./components/home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout should contain <Outlet />
    children: [
      {
        index: true, // This makes Home the default child route
        element: <Home />,
      }],},
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    
  
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
