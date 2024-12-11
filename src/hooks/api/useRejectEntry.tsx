import { useState } from "react";
import useCustomToast from "../useCustomToast";
import { toast } from "sonner";
import { hasPendingRequest, isAutoRequest, setNewRequest, setRequestToDone } from "@/lib/requestValidationUtil";
import Cookies from "js-cookie";
import { api } from "@/config";
import { removeRequestData } from "@/lib/cookieUtils";
import useRequestEntry from "./useRequestEntry";
import { useDispatch } from "react-redux";
import { changeRequestData } from "@/store/entryDataReducer";
import { changeImageData } from "@/store/imageReducer";


const useRejectEntry = () => {
    const { loadingToast, warningToast, errorToast,successToast } = useCustomToast()
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    const { request } = useRequestEntry()
    const dispatch = useDispatch()
    let toastId: number | string
    const reject = async (reason: string) => {

        // confirmationToast("Reject Entry ?","Please select one of the rejection reasons listed below.")
        // return
        const token = Cookies.get("jt")
        const req_data = Cookies.get("request_data")

        if (!req_data) {
            warningToast("Session Expired", "Please Relogin")
            Cookies.remove("jt");
            setTimeout(() => {
                window.location.href = "/sefl/entry/auth"
            }, 1000)

            return
        }

        const filename = JSON.parse(req_data || "").details.document


        if (!token) {
            warningToast("Session Expired", "Please Relogin")
            setTimeout(() => {
                window.location.href = "/sefl/entry/auth"
            }, 1000)

            return
        }

        setLoading(true);

        // CHECK IF HAS PENDING
        if (hasPendingRequest()) return

        // SET NEW REQUEST IS MADE
        setNewRequest()



        toastId = loadingToast("Rejecting Entry", "Please Wait ...")

        try {



            if (filename.length < 1) return

            const response = await api.get(`/document/reject/${filename}?reason=${reason}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Authorization header
                    'Content-Type': 'application/json' // Set content type if needed
                }

            })


            if (response.data) {


                if (isAutoRequest()) {
                 
                    setRequestToDone()   // SET NEW REQUEST IS Done
                    removeRequestData()
                    
                    request()
                    successToast("Entry Rejected", "The entry was successfully rejected, and new data has been automatically requested.");
                    
                } else {
          
                    removeRequestData()
                    dispatch(changeRequestData({ newValue: {} }))
                    dispatch(changeImageData({ newValue: "" }))
                    successToast("Entry Rejected", "The entry has been successfully rejected.");
                }
             


            }

        } catch (error: any) {
            errorToast('Cant connect to server', error.response?.data.message)
        } finally {
            toast.dismiss(toastId)
            setLoading(false);

            setRequestToDone()  // SET NEW REQUEST IS Done
        }


    };

    return { reject, loading }

}
export default useRejectEntry