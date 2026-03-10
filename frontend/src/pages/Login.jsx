import { useState } from "react";
import { useLogin } from "../features/auth/authMutations";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const navigate = useNavigate()
    const {mutate} = useLogin()
    
    const handleLogin = ()=>{ mutate(
        {email,password},
        { onSuccess:(data)=>{
            localStorage.setItem("token",data.data.token)
            navigate("/profile")
        }}
    )}
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <div className="flex w-[850px] rounded-2xl shadow-2xl overflow-hidden">
                
                {/* LEFT PANEL */}
                <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-4xl font-semibold mb-4">Welcome Back!!</h1>
                    <p className="text-center text-m opacity-80 max-w-xs">Login to access your profile and continue your journey.</p>
                </div>
                
                {/* RIGHT PANEL */}
                <div className="w-1/2 bg-card p-10">
                    <h2 className="text-2xl font-semibold text-textMain mb-8 text-center">Login</h2>
                    
                    <input type="email" placeholder="Email" className="w-full border border-primary rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="w-full border border-primary rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-primary" onChange={(e)=>setPassword(e.target.value)}/>
                    
                    <button onClick={handleLogin} className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg transition">Login</button>
                </div>
            </div>
        </div>
    )

}

export default Login