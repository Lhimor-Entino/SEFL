import { api } from "@/config"
import { changeInstructionData } from "@/store/instructionLookUpReducer"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"

const useInstructionLookup = () => {

    const dispatch = useDispatch()
    const getInstructions = async () => {
        const token = Cookies.get("jt")
           
        const req_data =  Cookies.get("request_data") 
        const filename = JSON.parse(req_data ||"").details.document
    
        try {
            const response = await api.post(`document/lookup/${filename}/apex_lookup.sefl_codes`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 

            dispatch(changeInstructionData({newValue: response.data.details}))
        } catch (error) {
            console.log(error)
        }
    }

   

    return{
        getInstructions,
       
    }


}

export default useInstructionLookup