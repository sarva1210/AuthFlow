import {useProfile} from "../features/auth/authQueries"

function Profile(){
    const token = localStorage.getItem("token")
    const {data,isLoading} = useProfile(token)
    
    if(isLoading) return <p>Loading...</p>
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-bgMain">
            <div className="bg-card p-10 rounded-2xl shadow-2xl w-[520px] text-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4"> {data.name.charAt(0)} </div>
                <h2 className="text-2xl font-semibold text-textMain mb-2"> {data.name} </h2>
                <p className="text-secondary mb-6"> {data.email} </p>
                <button onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.href="/login"}} 
                    className="bg-textMain hover:bg-secondary text-white px-6 py-2 rounded-lg transition">
                        Logout
                </button>
            </div>
        </div>
    )
}

export default Profile