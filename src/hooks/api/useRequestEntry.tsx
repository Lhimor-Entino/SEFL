import { useState } from "react";
import useCustomToast from "../useCustomToast";
import { toast } from "sonner";
import { hasPendingRequest, setNewRequest, setOngoingRequest, setRequestToDone } from "@/lib/requestValidationUtil";
import { api } from "@/config";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { changeRequestData } from "@/store/entryDataReducer";

import { changeImageData } from "@/store/imageReducer";
import useInstructionLookup from "./useInstructionLookup";



const useRequestEntry = () => {
    const { loadingToast, warningToast,  } = useCustomToast()
    const {getInstructions} = useInstructionLookup()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch()

    let toastId: number | string
    const request = async () => {

        const token = Cookies.get("jt")
        const client = Cookies.get("client")
        if (!token) {
            warningToast("Session Expired", "Please Relogin")

            setTimeout(() => {
                window.location.href = "/sefl/entry/auth"
               },1000)
            return
        }
        // if(hasOngoingRequest()) { // CHECK IF HAS ONGOING REQUEST
        //     errorToast("Ongoing Request", "Please finish your pending request.")
        //     return
        // }
        if (hasPendingRequest()) return // CHECK IF HAS PENDING API CALL

        setLoading(true);
        setNewRequest()  // SET NEW REQUEST IS MADE

        toastId = loadingToast("Requesting for Entry", "Please Wait ...")

        try {
            const response1 = await api.get(
                `/document/request`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response1)
            const filename = response1.data.details.document
            const response2 = await api.get(`/document/get-image/${client}/${filename}/${1}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: "blob",
            })

            const response3 = await api.get(`/document/get-ocr-data/${client}/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            // IF ALREADY REQUESTED DON'T EXECUTE THIS
         //   if(!Cookies.get("request_data")){
                await api.post(`/document/start-process/${filename}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Authorization header
                        'Content-Type': 'application/json' // Set content type if needed
                    }
                })    
          //  }
        
            const blob = new Blob([response2.data], { type: "jpg" });
            const url = URL.createObjectURL(blob);

            dispatch(changeImageData({ newValue: url }))
            dispatch(changeRequestData({ newValue: response3.data }))
            
            setOngoingRequest(response1.data) // save ongoing request
            console.log(response3.data)
            getInstructions()

        } catch (err: any) {
            setError(err.message || 'Unknown error');
            console.log(err)
            if(err.response?.data?.status == 400){
                warningToast("Alert",err.response?.data?.message)
            }
        } finally {
            toast.dismiss(toastId)
            setLoading(false);
            setRequestToDone()     // SET NEW REQUEST IS Done
        }

    };



    return { request, loading, error };
}

export default useRequestEntry;