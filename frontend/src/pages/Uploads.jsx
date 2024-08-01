import { BrainCircuit, Folders, MonitorUp, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Load } from '../components';
import axios from '../calls/axios';
import { safeGet } from "../calls/utils";
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useData } from '../calls/gets';


const Uploads = () => {

    const ref = useRef();
    const [files, setFiles] = useState([]);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const { key } = useAuth();

    const { data, isLoading } = useData({
        target: '/upload'
    }, key);

    useEffect(() => {
       if(data && data.length <= 0) navigate('/dashboard');
    })


    console.log(data, isLoading);


    return (
        <div className='min-h-screen bg-[#222]'>
            <Toaster position='top-center' richColors/>
            <div className="top flex items-center justify-between px-6 py-3">
                <div className="logo" onClick={()=>navigate('/')}>
                    <div className="logo font-black flex items-center text-xl gap-0.5">
                        <span><BrainCircuit size={28} /></span>
                        <span>PRAIF</span>
                    </div>
                </div>

                <div className="profiles">

                    <div className="h-[50px] w-[50px] rounded-full overflow-hidden bg-[#333]">
                        <img src="/images/black_ranger.png" className="scale-90" />
                    </div>
                </div>
            </div>

            <nav className='flex'>
                <div className="left"></div>
                <div className="right"></div>
            </nav>

            {(data && data.length <= 0) &&
                <div className="h-[500px] flex flex-col items-center justify-center">
                    <span className='text-blue-300'>
                        <MonitorUp size={250} strokeWidth={0.2}/>
                    </span>
                    <div className="text-center text-2xl font-semibold">No Documents Uploaded</div>
                    <div className="text-center max-w-[300px] text-xs mt-1.5">You have not uploaded any documents yet. Please upload a document to proceed.</div>
                    <button className='relative border-2 border-blue-500 rounded-2xl mt-3 p-0.5 w-[180px] border-opacity-10 hover:border-opacity-100 active:border-emerald-400'>
                        <div className="bg-blue-500 text-white active:bg-emerald-400 rounded-xl px-6 py-2 text-xs font-semibold w-full">click to upload</div>
                        <input ref={ref} onChange={(e) => setFiles(e.target.files)} type="file" name="files" className="opacity-0 absolute top-0 left-0 h-full w-full" webkitdirectory directory multiple accept=".pdf,image/*"/>
                    </button>
                </div>
            }

            {(data && data.length > 0) &&
                <div className="grid-box px-24 py-12 gap-6">
                    { data.map((item, index) => 
                        <div onClick={() => navigate('/files/' + item.id)} className="item h-[200px] rounded shadow bg-[#333] hover:bg-blue-500 hover:bg-opacity-10 cursor-pointer flex flex-col justify-center items-center p-1.5 relative">
                            <span>
                                <Folders size={150} strokeWidth={0.3}/>
                            </span>
                            <span className='text-xs font-semibold'>
                                {item.name}
                            </span>
                            {/* <div onClick={() => close(index)} className="absolute top-0 right-0 p-3 flex items-center justify-center hover:text-red-400">
                                <X />
                            </div> */}
                        </div>
                    )}

                    
                    
                    <Load load={load}/>
                </div>
            }

        </div>
    )
}

export default Uploads