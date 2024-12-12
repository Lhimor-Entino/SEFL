import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import useRejectEntry from "@/hooks/api/useRejectEntry";
import { Reject } from "@/lib/LookupUtil";
import { changeModalData } from "@/store/modalReducer";
import { AsteriskIcon, CircleXIcon } from "lucide-react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


interface Props  {
    showRejectModal: boolean;
    setShowRejectModal: (arg: boolean) => void;
}

const RejectModal = (props: Props) => {
    const {showRejectModal,setShowRejectModal} = props
    const [reason,setReason] = useState<string>("")
    const [customReason,setCustomReason]= useState<string|null>()
    const {reject} = useRejectEntry()
    const dispatch = useDispatch()
    const instruction_data_reducer = useSelector((state: any) => state.instruction_data_reducer);
    const handleClose = () => {
        setShowRejectModal(!showRejectModal)
        dispatch(changeModalData({property:"rejectModal"}))
        setReason("")
    }

    const handleReject = () => {

        let reject_reason = customReason ? customReason : reason
        reject(reject_reason)
        handleClose()
        
    }
  return (
    <Dialog open={showRejectModal} onOpenChange={() => handleClose()}>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reject Entry ?</DialogTitle>
                    <DialogDescription>
                       
                        Please select one of the rejection reasons listed below.
                    </DialogDescription>
                </DialogHeader>
                <div  className="flex justify-center flex-col">
                <Select onValueChange={(e)=>setReason(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Reasons</SelectLabel>
                            {
                                instruction_data_reducer.map((ins:any, index:number) => ins.type === Reject && (
                                    <SelectItem key={index} value={ins.description}>{ins.description}</SelectItem>
                                ))
                            }
                           
                        
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    reason === "OTHERS" &&  
                    <div className="mt-4 flex flex-col gap-y-2">
                        <div className="flex items-center">
                            <p className="text-sm text-red-700 font-semibold">Required  </p>
                            <AsteriskIcon  className="text-red-700 w-4 h-4"/>
                        </div>
                     
                        <Input placeholder="reason" onChange={({target}) => setCustomReason(target.value)}/>
                    </div> 

                }
             
                </div>
          
                <DialogFooter className="mt-3">
                    <Button disabled={reason.length < 1 ? true :false} type="button" className="bg-red-800" 
                 onClick={() => handleReject()}
                    >
                        <CircleXIcon className="w-4 h-4 mr-1 flex flex-col items-center" />
                               Reject
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
  )
}

export default RejectModal