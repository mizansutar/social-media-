import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/mainLayout";
import Home from "./components/home";
import Login from "./components/Login";
import SignUp from  "./components/signUp"
import Profile from "./components/profile";
import { ToastContainer } from "react-toastify";
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout should contain <Outlet />
    children: [
      {
        //index: true, // This makes Home the default child route
        path: "/",
        element: <Home />,
      },
      {
        //index: true, // This makes Home the default child route
        path: "/profile",
        element: <Profile/>,
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp/>,
  },


]);

function App() {
  return (<>
  
  <ToastContainer position="top-right" autoClose={3000} />
  <RouterProvider router={browserRouter} />
  </>);
}

export default App;
