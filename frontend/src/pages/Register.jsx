import { useState } from "react";
import {useRegister} from "../features/auth/authMutations"

function Register(){
    const [form, setform] = useState({
        name:"",
        email:"",
        password:""
    })

    const {mutate} = useRegister()

    const handleSubmit = (e)=>{
        e.preventDefault()
        mutate(form)
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-bgMain"> 
            <form onSubmit={handleSubmit} className="bg-card p-10 rounded-2xl shadow-2xl w-[580px]">
                <h2 className="text-2xl font-semibold mb-6 text-textMain text-center">Register</h2>

                <input placeholder="Name" className="w-full p-3 mb-4 rounded-lg border border-primary bg-bgMain focus:outline-none focus:ring-2 focus:ring-primary" onChange={(e)=>setform({...form, name:e.target.value})}/>
                <input placeholder="Email" className="w-full p-3 mb-4 rounded-lg border border-primary bg-bgMain focus:outline-none focus:ring-2 focus:ring-primary" onChange={(e)=>setform({...form, email:e.target.value})}/>
                <input type="password" placeholder="password" className="w-full p-3 mb-4 rounded-lg border border-primary bg-bgMain focus:outline-none focus:ring-2 focus:ring-primary" onChange={(e)=>setform({...form, password:e.target.value})}/>

                <button className="w-full bg-textMain hover:bg-secondary text-white py-3 rounded-lg transition duration-200">Register</button>
            </form>
        </div>
    )
}

export default Register