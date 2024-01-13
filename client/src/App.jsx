import './App.css'
// import Questions from './components/Questions'
import {RouterProvider } from "react-router-dom";

import routes from './routes';

const  App = () =>{
  return(
      <>
          {/* <Questions /> */}
          <RouterProvider router={routes} />
      </>  
  )
}

export default App
