import { BrainCircuit, ChevronLeft, Eye, Moon, ShieldQuestion, Sun } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMode } from '../store/mode';


const styles = {
    input_: "input flex flex-col gap-1.5 mb-4 group",
    input: "bg-transparent border border-[#999] border-opacity-50 dark:border-[#333] py-2 px-3 focus-visible: focus-visible:outline-none focus-visible:ring-0 text-lg rounded-xl relative",
    label: "text-xs opacity-70 font-semibold group-focus-within:opacity-100 group-focus-within:text-emerald-400",
}

const Login = () => {
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();
    const { mode, toggleMode } = useMode();

    return (
        <div className='p-24 max-[550px]:px-12 max-[400px]:px-6 dark:bg-[#222] dark:text-white min-h-screen relative'>

            <div onClick={()=>navigate(-1)} className="fixed top-0 left-0 p-9 px-12 max-[550px]:px-6 max-[550px]:p-4">
                <div className="h-[30px] w-[30px] border border-gray-400 rounded-full flex items-center justify-center">
                    <ChevronLeft size={18} />
                </div>
            </div>

            <div onClick={toggleMode} className="absolute top-0 right-0 p-6 px-12 max-[550px]:px-6 max-[550px]:p-4">
                <div className="h-[40px] w-max border-gray-400 rounded-full flex items-center justify-center">
                    { mode == "dark" ? <Sun size={18}/> : <Moon size={18} />}
                </div>
            </div>
            
            <div className="max-w-[500px] mx-auto">
                <div className="">   
                    <div className="logo font-black flex items-center text-4xl gap-0.5 my-3 mb- opacity-2-0">
                        <span><BrainCircuit size={42} /></span>
                        <span>PRAIF</span>  
                    </div>

                    <p className='text-sm font-medium'>Welcome back ranger! provide your credentials to access the document layer</p>

                </div>

                <form action="" className="mt-9">
                    <div className={`${styles.input_}`}>
                        <label htmlFor="username" className={`${styles.label}`}>Email / Username</label>
                        <input type="text" name="username" className={`${styles.input}`} />
                    </div>

                    <div className={`${styles.input_}`}>
                        <label htmlFor="password" className={`${styles.label}`}>Password</label>
                            
                        <div className="relative">
                            <input type={password ? 'password' : 'text'} name="password" className={`${styles.input} w-full`} />

                            <div onClick={()=>setPassword(!password)} className="absolute top-0 right-0 h-full flex items-center justify-center px-3 opacity-50 cursor-pointer">
                                {password ? <Eye size={25} strokeWidth={1.6}/> : <EyeOff size={25} strokeWidth={1.6}/> }
                            </div>
                        </div>
                    </div>

                    <button className='border-2 border-blue-500 rounded-2xl mt-3 p-0.5 w-full border-opacity-10 hover:border-opacity-100 active:border-emerald-400'>
                        <div className="bg-blue-500 text-white active:bg-emerald-400 rounded-xl px-6 py-2 text-sm font-semibold w-full">Continue</div>
                    </button>

                    <p className="text-xs font-semibold mt-6 text-center text-gray-600 dark:text-gray-200 w-full">Dont have an account? <span onClick={()=>navigate('/signup')} className="font-bold text-blue-500 underline cursor-pointer">create an account</span> now!</p>

                </form>
            </div>
        </div>
    )
}

export default Login