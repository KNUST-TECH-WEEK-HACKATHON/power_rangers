import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../calls/axios';
import { safeGet } from "../calls/utils";
import { Load } from '../components';
import { useAuth } from '../store/auth';
import { Toaster, toast } from 'sonner';

const Final = () => {

    const { id } = useParams();
    const [load, setLoad] = useState(true);
    const { key } = useAuth();

    const loadData = async () => {
        setLoad(true);

        try {
            const result = await axios.post('/model', {
                id
            }, {
                headers: {
                    Authorization: `Bearer ${key}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log(result);

            if (safeGet(result, ["data", "success"])) {
                toast.success("Document Analysis Complete");
                navigate('/dashboard')
            }
            else {
                toast.warning("Oops", {
                    description: result.data.message,
                })
            }
        }
        catch(e) {

            console.log(e);

        }

        setLoad(false);
    }

    useEffect(() => {
        
        loadData();

    }, [id]);



  return (
    <div>
        <Load load={load} />
        <Toaster richColors/>
        <div className="mx-auto h-screen w-screen bg-[#222]">
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default Final