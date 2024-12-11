import { useEffect, useRef, useState } from "react";
import useCustomToast from "../useCustomToast";
import { toast } from "sonner";
import { hasPendingRequest, isAutoRequest, setNewRequest, setRequestToDone } from "@/lib/requestValidationUtil";
import { useDispatch, useSelector } from "react-redux";
import { EntryData } from "@/types";
import useRequestEntry from "./useRequestEntry";
import Cookies from "js-cookie";
import { removeRequestData } from "@/lib/cookieUtils";
import { api } from "@/config";
import { changeRequestData } from "@/store/entryDataReducer";
import { BanIcon } from "lucide-react";
import { changeImageData } from "@/store/imageReducer";



const useSaveEntry = () => {

    const { loadingToast, errorToast, warningToast } = useCustomToast()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const entry_data = useSelector((state: EntryData) => state.entry_data_reducer)
    const entryDataRef = useRef(entry_data)
    const dispatch = useDispatch()
    const { request } = useRequestEntry()
    let toastId: number | string
    const saveEntry = async () => {

        const token = Cookies.get("jt")
        const req_data = Cookies.get("request_data")

        if(!req_data){
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
        setError(null);
        // CHECK IF HAS PENDING
        if (hasPendingRequest()) return

        // SET NEW REQUEST IS MADE
        setNewRequest()

        toastId = loadingToast("Saving Entry", "Please Wait ...")

        try {

            const formData = entryDataRef.current
            
            const response = await api.post(
                `/document/save/${filename}`,
                formData, // Data to be sent in the request body
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Authorization header
                        'Content-Type': 'application/json' // Set content type if needed
                    }
                }
            );

            if (response.data) {
                if (isAutoRequest()) {
                    setRequestToDone()   // SET NEW REQUEST IS Done
                    removeRequestData()

                    request()
                } else {
                    removeRequestData()
                    dispatch(changeRequestData({ newValue: {} }))
                    dispatch(changeImageData({ newValue: "" }))
                }
            }
        } catch (error: any) {

            if (error.response?.data.status == "400" || error.response?.data.status == "406") {

                //MEANS FILE DOESNT EXIST
                if (error.response.data.status == "400") {
                    removeRequestData()

                    errorToast(error.response?.data.message, "Entry File does'nt Exist")
                }
                if (error.response.data.status == "406") {
                    errorToast(error.response?.data.message, <div>
                        {/* <p>Required Field(s)</p> */}
                        {error.response?.data.details.map((d: any, index: number) => (
                            <div className="flex items-center mt-2 gap-x-2">
                                <BanIcon className="w-4 h-4" />
                                <p  key={index}>{d.field}</p>
                                <p  key={index + d.message}>{d.message}</p>
                            </div>

                        ))}
                    </div>, 3000)

                }
            } else {
                errorToast('Cant connect to server', 'Error connection timeout')

            }
        } finally {
            toast.dismiss(toastId)
            setLoading(false);

            setRequestToDone()  // SET NEW REQUEST IS Done
        }

    };



    useEffect(() => {
        entryDataRef.current = entry_data

    }, [entry_data])


    return { loading, error, saveEntry };


}
export default useSaveEntry