import { createBrowserRouter } from "react-router-dom"
import Application from './pages/Application';
import Login from './pages/Registeration/Login';
import Signup from './pages/Registeration/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Nopage from './pages/pagenotfound/Nopage';
import isLoggedIn from "./utils/loggedin";

const routes = createBrowserRouter([
    {
        path: '',
        element: <Application />,
        loader : () => isLoggedIn()
    },
    {
        path: "/login",
        element: <Login />
    },
    {

        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        loader : () => isLoggedIn()
    },
    {
        path: "*",
        element: <Nopage />
    }
])

export default routes
