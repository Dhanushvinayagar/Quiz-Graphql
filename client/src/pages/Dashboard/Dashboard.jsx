import { useLoaderData } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
import CheckLogin from '../checkLogin';
import Navbar from '../Navbar';


const Dashboard = () => {

  CheckLogin(useLoaderData())
  // const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div>
        Your activity
      </div>
    </>
  )
}

export default Dashboard
