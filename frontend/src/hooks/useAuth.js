import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate()
    
    const getToken = () => {
        return localStorage.getItem("token")
    }
    
    const login = (token) => {
        localStorage.setItem("token", token)
        navigate("/profile")
    }
    
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    
    const isAuthenticated = () => {
        return !!localStorage.getItem("token")
    }
    
    return { getToken, login, logout, isAuthenticated}
}