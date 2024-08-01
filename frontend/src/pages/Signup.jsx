import { BrainCircuit, ChevronLeft, Eye, EyeOff, Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMode } from '../store/mode';
import { Toaster, toast } from 'sonner';
import axios from '../calls/axios';
import { safeGet } from "../calls/utils";
import { useAuth } from '../store/auth';
import { Load } from '../components';

const styles = {
    input_: "input flex flex-col gap-1.5 mb-4 group",
    input: "bg-transparent border border-[#999] border-opacity-50 dark:border-[#333] py-2 px-3 focus-visible: focus-visible:outline-none focus-visible:ring-0 text-lg rounded-xl relative",
    label: "text-xs opacity-70 font-semibold group-focus-within:opacity-100 group-focus-within:text-emerald-400",
    error: "error text-xs text-red-500 font-semibold",
}

const Signup = () => {

    const [password, setPassword] = useState(true);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const { mode, toggleMode } = useMode();
    const { setKey } = useAuth();

    const [errors, setErrors] = useState({});

    const { register, handleSubmit } = useForm({
        defaultValues: {
          name: '',
          email: '',
          password: '',
        }
    });

    const signup = async (data) => {

        setLoad(true);

        try {

            const result = await axios.post('/signup', data);
    
            console.log(result);

            if (safeGet(result, ["data", "data", "token"])) {
                setKey(safeGet(result, ["data", "data", "token"]));
                toast.success("Doc-Ranger Initialized Successfully");
                navigate('/uploads');
            }
            else {
                toast.warning("Oops", {
                    description: result.data.message,
                })
            }
        }
        catch(e) {
            

            // console.log(e?.response?.data?.errors);

            if(e?.response?.data?.errors) {
                // setErrors(e.response.data.errors);
                Object.values(e.response.data.errors).map(error => toast.warning(error))
            }
            else
            toast.error('System Busy', {
                description: 'Please try again later',
            });

            // console.log(e);
        }

        setLoad(false);

    }

    return (
        <div className='dark:bg-[#222] dark:text-white min-h-screen relative'>

            <Toaster position='top-center' richColors/>
            <Load load={load} />

            <div className="flex max-[500px]:flex-col">

                <div className="w-[700px] max-[500px]:w-full max-[815px]:w-auto max-[815px]:flex-grow h-screen overflow-y-scroll scrollbar-thin mx-auto p-24 max-[990px]:px-12 max-[500px]:px-6 py-16 relative">

                    <div onClick={()=>navigate(-1)} className="absolute top-0 left-0 p-4">
                        <div className="h-[30px] w-[30px] border border-gray-400 rounded-full flex items-center justify-center">
                            <ChevronLeft size={18} />
                        </div>
                    </div>

                    <div onClick={toggleMode} className="absolute top-0 right-0 p-4 px-6 max-[550px]:px-6 max-[550px]:p-4">
                        <div className="h-[40px] w-max border-gray-400 rounded-full flex items-center justify-center">
                            { mode == "dark" ? <Sun size={18}/> : <Moon size={18} />}
                        </div>
                    </div>

                    <div className="">

                        
                        <div className="font-semibold text-3xl max-w-[200px]">Welcome Doc-Ranger</div>
                        <p className='text-xs mt-3 font-medium max-w-[300px]'>Provide the details bellow to activate your ranger account</p>

                    </div>

                    <form onSubmit={handleSubmit(signup)} className="mt-9 mx-auto max-w-[600px]">

                        <div className={`${styles.input_}`}>
                            <label htmlFor="name" className={`${styles.label}`}>Full Name</label>
                            <input {...register("name", { required: true })} type="text" className={`${styles.input}`} />
                            {errors.name && <div className={styles.error}>{errors.name}</div>}
                        </div>

                        <div className={`${styles.input_}`}>
                            <label htmlFor="email" className={`${styles.label}`}>Email</label>
                            <input type="text" {...register("email", { required: true })} className={`${styles.input}`} />
                            {errors.email && <div className={styles.error}>{errors.email}</div>}
                        </div>


                        <div className={`${styles.input_}`}>
                            <label htmlFor="password" className={`${styles.label}`}>Password</label>
                                
                            <div className="relative">
                                <input type={password ? 'password' : 'text'} {...register("password", { required: true })} className={`${styles.input} w-full`} />

                                <div onClick={()=>setPassword(!password)} className="absolute top-0 right-0 h-full flex items-center justify-center px-3 opacity-50 cursor-pointer">
                                    {password ? <Eye size={25} strokeWidth={1.6}/> : <EyeOff size={25} strokeWidth={1.6}/> }
                                </div>
                            </div>
                            {errors.password && <div className={styles.error}>{errors.password}</div>}
                        </div>

                        <button className='border-2 border-blue-500 rounded-2xl mt-3 p-0.5 w-full border-opacity-10 hover:border-opacity-100 active:border-emerald-400'>
                            <div className="bg-blue-500 active:bg-emerald-400 rounded-xl px-6 py-2 text-sm font-semibold w-full">Continue</div>
                        </button>

                        <p className="text-xs font-semibold mt-6 text-center text-gray-600 dark:text-gray-200 w-full">Already have an account? log into your account <span onClick={()=>navigate('/login')} className="font-bold text-blue-500 underline cursor-pointer">here</span></p>

                    </form>
                </div>
                
                <div className="flex-grow max-[815px]:w-[100px] h-screen overflow-hidden relative max-[500px]:hidden">
                    <img src="/images/ai.png" alt="" className="object-cover h-full w-full" />
                    <div className="absolute bottom-0 left-0 h-[40%] w-full  z-10">
                        
                    </div>
                    <div className="absolute top-0 left-0 h-full w-full z-0 bg-[#555] dark:bg-black dark:bg-opacity-50 text-white bg-opacity-50 backdrop-blur flex items-center justify-center">
                        <div className="logo max-[815px]:rotate-90 font-black flex items-center text-6xl gap-0.5 my-3 mb- opacity-2-0">
                            <span><BrainCircuit size={72} /></span>
                            <span>PRAIF</span>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Signup