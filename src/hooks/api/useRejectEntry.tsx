import { useState } from "react";
import useCustomToast from "../useCustomToast";
import { toast } from "sonner";
import { hasPendingRequest, setNewRequest, setRequestToDone } from "@/lib/requestValidationUtil";
import Cookies from "js-cookie";


const useRejectEntry = () => {
    const { loadingToast,warningToast } = useCustomToast()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
 
    let toastId: number | string
    const reject = async () => {
        
        const token = Cookies.get("jt")
    
        if (!token) {
            warningToast("Session Expired", "Please Relogin")
        }

        setLoading(true);

        // CHECK IF HAS PENDING
        if(hasPendingRequest()) return
        
        // SET NEW REQUEST IS MADE
        setNewRequest()
   


        toastId = loadingToast("Rejecting Entry", "Please Wait ...")
        setTimeout(() => {
            try {
                console.log(2)
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                toast.dismiss(toastId)
                setLoading(false);

                // SET NEW REQUEST IS Done
                setRequestToDone()
            }
        }, 2000); // Simulate a 2-second delay for the API call
    };

    return { reject, loading, error }

}
export default useRejectEntry