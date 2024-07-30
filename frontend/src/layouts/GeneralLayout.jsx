import { useState } from "react";
import { Nav } from "../components";
import { Outlet } from "react-router-dom";

const Home = () => {

  const [menu, setMenu] = useState(false);


  return (
    <div className="w-sceen h-sceen flex dark:bg-[#222] dark:text-white overflow-hidden">
        <div className={`w-max flex relative transition-all duration-300 ${ menu ? 'max-[920px]:-left-[300px]' : 'left-0'} `}>

          <main className="w-screen relative h-screen overflow-y-scroll">
            <Nav.Desktop menu={menu} setMenu={setMenu} />
        
            <Outlet />
          </main>

          <Nav.Mobile />
        </div>


    </div>
  )
}

export default Home