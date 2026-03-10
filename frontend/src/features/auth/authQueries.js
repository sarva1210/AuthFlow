import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./authApi";

export const useProfile = (token)=>{
    return useQuery({
        queryKey:["profile"],
        queryFn:()=>getProfile(token).then(res=>res.data)
    })
}