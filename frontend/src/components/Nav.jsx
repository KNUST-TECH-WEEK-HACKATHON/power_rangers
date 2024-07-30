import React from 'react'
import { BrainCircuit, CircuitBoard, HousePlug, LogIn, Menu, MessageCircleReply, Moon, Sun, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useMode } from '../store/mode';

const navs = [
    {
      name: 'Home',
      link: '/',
      icon: (size=18) => <HousePlug size={size} />,
    },
    {
      name: 'About',
      link: '/about',
      icon: (size=18) => <CircuitBoard size={size} />,
    },
    // {
    //   name: 'Contact Us',
    //   link: '/contact',
    //   icon: (size=18) => <MessageCircleReply size={size} />,
    // },
];

export const Desktop = ({ menu, setMenu}) => {

  const navigate = useNavigate();
  const { mode, toggleMode } = useMode();
    
  return (
    <nav className="absolute top-0 w-full left-0 z-20 px-6 py-3 max-[430px]:px-0 max-[430px]:py-0 dark:text-white ">
        
        <div className="shadow flex items-center justify-between spacing-x py-3 bg-white dark:bg-[#333] max-[430px]:rounded-none max-[430px]:text-white max-[430px]:bg-blue-500 max-[430px]:dark:bg-blue-500 rounded-3xl">
            <div className="logo font-black flex items-center gap-0.5">
                <span><BrainCircuit size={18} /></span>
                <span>PRAIF</span>
            </div>

            <div className="navs flex items-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-[920px]:hidden">
                {navs.map( (item, index) => 
                    <div key={index} onClick={() => navigate(item.link)} className="nav-item flex items-center gap-0.5 hover:text-emerald-300 cursor-pointer">
                        <div className="icon">
                        {item.icon()}
                        </div>
                        <div className="name text-sm font-semibold">{item.name}</div>
                    </div>
                )}

                <div onClick={() => toggleMode()} className="nav-item flex items-center gap-0.5 hover:text-emerald-300 cursor-pointer">
                    <div className="icon">
                        { mode == "dark" ? <Sun size={18}/> : <Moon size={18} />}
                    </div>
                    <div className="name text-sm font-semibold">{mode == "light" ? "Dark" : "Lignt"}</div>
                </div>
            </div>
            <div className="btns flex items-center gap-3 max-[920px]:hidden">
                <button onClick={() => navigate('/login')} className="border-2 border-blue-500 text-blue-500 dark:text-blue-400 text-sm font-semibold rounded-3xl px-6 py-1.5">Log In</button>
                <button onClick={() => navigate('/signup')} className="border-2 border-blue-500 bg-blue-500 text-white text-sm font-semibold rounded-3xl px-6 py-1.5">Sign Up</button>
            </div>

            <div onClick={()=>setMenu(!menu)} className="menu-btn min-[921px]:hidden">
                <Menu />
            </div>
        </div>
    </nav>
  )
}

export const Mobile = () => {

    const navigate = useNavigate();

    const { mode, toggleMode } = useMode()

    return (
        <aside className="w-[300px] h-screen bg-white dark:bg-[#111] dark:text-white bg-opacity-95 px-6">
              {/* <div className="h-[80px]"></div> */}
            <div className="logo font-semibold flex items-center text-xl gap-0.5 my-3 mb-9 opacity-20">
                <span><BrainCircuit size={22} /></span>
                <span>PRAIF</span>
            </div>

            {navs.map( item => 
                <div onClick={()=>navigate(item.link)} className="flex items-center group bg-[#333] hover:bg-blue-500 hover:text-white transition-all duration-200 bg-opacity-5 my-3 mb-4 px-3 py-2 gap-3 rounded-lg">
                  <div className="icon text-emerakld-400 group-hover:text-white">
                    {item.icon()}
                  </div>
                  <div className="text-sm font-semibold">{item.name}</div>
                </div>
            )}

            <div onClick={() => navigate('/login')} className="flex items-center bg-[#333] hover:bg-blue-500 hover:text-white transition-all duration-200 bg-opacity-5 my-3 mb-4 px-3 py-2 gap-3 rounded-lg">
                <div className="icon text-bflue-500 group-hover:text-white ">
                    <LogIn size={18}/>
                </div>
                <div className="text-sm font-semibold">Log In</div>
            </div>

            <div onClick={() => navigate('/signup')} className="flex items-center bg-[#333] hover:bg-blue-500 hover:text-white transition-all duration-200 bg-opacity-5 my-3 mb-4 px-3 py-2 gap-3 rounded-lg">
                <div className="icon text-blfue-500 group-hover:text-white">
                    <User size={18}/>
                </div>
                <div className="text-sm font-semibold">Sign Up</div>
            </div>

            <div onClick={toggleMode} className="flex items-center bg-[#333] hover:bg-blue-500 hover:text-white transition-all duration-200 bg-opacity-5 my-3 mb-4 px-3 py-2 gap-3 rounded-lg">
                <div className="icon text-blfue-500 group-hover:text-white">
                    {mode == "light" ? <Moon size={18}/> : <Sun size={18} />}
                </div>
                <div className="text-sm font-semibold">{mode == "light" ? "Dark" : "Light"}</div>
            </div>
        </aside>
    );
}