import { Outlet } from "react-router-dom"
import { NavBar } from "./component/navbar"

function App() {

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '100px' }}></div>
      <Outlet />
    </> 
  )
}

export default App
