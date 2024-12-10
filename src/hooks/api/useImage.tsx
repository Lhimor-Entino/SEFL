import { api } from "@/config"
import { saveImg } from "@/lib/cookieUtils"
import { changeImageData } from "@/store/imageReducer"
import Cookies from "js-cookie"
import { useState } from "react"
import { useDispatch } from "react-redux"
import useCustomToast from "../useCustomToast"

export const useImage = () => {
    const { loadingToast, warningToast,errorToast } = useCustomToast()

    const dispatch = useDispatch()
    const [loading,setLoading] = useState<boolean>(false)
    const refetchImg = async () => {
        
        setLoading(true)
        const token = Cookies.get("jt")
        const client = Cookies.get("client")
        const req_data = Cookies.get("request_data")
        const filename = JSON.parse(req_data || "").details.document
    
        try {
            const response2 = await api.get(`/document/get-image/${client}/${filename}/${1}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              responseType: "blob",
            })
      
      
            const blob = new Blob([response2.data], { type: "jpg" });
            const url = URL.createObjectURL(blob);
            // const img_urls = { newValue: [url], property: "img_urls" };
      
            dispatch(changeImageData({ newValue: url }))
         
            // setReloadingImg(false)
          } catch (error: any) {
            console.log(error)
      
            // tokenExpired()
      
          }finally{
            setLoading(false)
          }
    }


    const nextImage = async (pageNumber: number) => {

        const token = Cookies.get("jt")
        const req_data = Cookies.get("request_data")
        const filename = JSON.parse(req_data || "").details.document

        try {
          const response2 = await api.get(`/document/get-image/${filename}/${pageNumber}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            responseType: "blob",
          })
    
          const blob = new Blob([response2.data], { type: "jpg" });
          const url = URL.createObjectURL(blob);
   
    
          const img_urls = { newValue: [url], property: "img_urls" };
          dispatch(changeImageData(img_urls))
       
        } catch (error: any) {
    
          if (error.response.data instanceof Blob) {
            const errorMessage = await error.response.data.text(); // Convert the blob to text
            const errmsg = JSON.parse(errorMessage)
            
            errorToast(errmsg.details,errmsg.message)
      
          }
      
        } finally {
    
         
        }
    
    
      }
    return{
        refetchImg,
        nextImage,
        loading
    }
}
export default useImage