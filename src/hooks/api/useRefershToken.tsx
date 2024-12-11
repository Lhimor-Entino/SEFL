import { api } from "@/config"
import Cookies from "js-cookie"
import useCustomToast from "../useCustomToast"


export const useRefreshToken = () => {

    const {errorToast}  = useCustomToast()
    const refreshToken = async () => {
             console.log("refresh")
        const token = Cookies.get("jt")
        if(!token){
            errorToast("Refresh token failed","No token found")
        }
        const response = await api.get(`/credential/refresh-token`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Authorization header
            'Content-Type': 'application/json' // Set content type if needed
          }
    
        })
    
        if(response.data){
          console.log("refresh",response.data)
        }
      }

   
    return{
        refreshToken,
       
    }
}
export default useRefreshToken