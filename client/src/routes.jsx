import { createBrowserRouter } from "react-router-dom"
import Application from './pages/Application';
import Login from './pages/Registeration/Login';
import Signup from './pages/Registeration/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Nopage from './pages/pagenotfound/Nopage';

const routes = createBrowserRouter([
    {
        path: '',
        element: <Application />
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
        element: <Dashboard />
    },
    {
        path: "*",
        element: <Nopage />
    }
])

export default routes
