import { api } from "@/config";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../useCustomToast";
import { toast } from "sonner";
import { hasPendingRequest, setNewRequest, setRequestToDone } from "@/lib/requestValidationUtil";
import { removeRequestData, removeToken } from "@/lib/cookieUtils";
import { useDispatch } from "react-redux";
import { changeRequestData } from "@/store/entryDataReducer";
import { changeImageData } from "@/store/imageReducer";

const useLogout = () => {
    const { loadingToast, warningToast, } = useCustomToast()
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    let toastId: number | string

    const logout = async () => {

    
      try {
        if (hasPendingRequest()) return // CHECK IF HAS PENDING API CALL
        const token = Cookies.get("jt")
 
        if(!token) {
          warningToast("Logged Out Automatically","Session Expired")
        
            navigate("/auth")
          
        }
   
   
        const req_data =  Cookies.get("request_data") 
        const filename = JSON.parse(req_data ||"").details.document
          if(!filename){
            return
          }
        setLoading(true);
        setNewRequest()  // SET NEW REQUEST IS MADE
        toastId = loadingToast("Logging Out", "Please Wait ...")
        setLoading(true)

        const response = await api.get(`document/unlock/${filename}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.status == "200" ) {
 
            removeRequestData() 
            removeToken()
            dispatch(changeRequestData({newValue:{} }))
            dispatch(changeImageData({newValue:{} }))
            navigate("/auth")
       

        }
      } catch (error:any) {
        removeRequestData() 
        removeToken()
        dispatch(changeRequestData({newValue:{} }))
        dispatch(changeImageData({newValue:{} }))
        navigate("/auth")
      }finally{
        toast.dismiss(toastId)
        setLoading(false);
        setRequestToDone()     // SET NEW REQUEST IS Done
      }
    };

    return{
        logout,
        loading
    }
}
export default useLogout