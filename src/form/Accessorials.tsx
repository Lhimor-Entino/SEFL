
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import useCustomToast from "@/hooks/useCustomToast"
import { Charges_Type, isAccessorialTypeExist } from "@/lib/LookupUtil"
import { addAccessorial, changeAccessorialData, removeChargeItem, setAccessorialData } from "@/store/entryDataReducer"
import { Accessorial, EntryData, } from "@/types"
import {  MousePointerClickIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


import { Badge } from "@/components/ui/badge"
import { focusNextInput, start_index } from "@/lib/generalUtil"
import { checkNullItems } from "@/lib/validationUtils"

type Props = {
    handleScrollToBottomCharge: () => void
}

const Accessorials = (props: Props) => {
    const {handleScrollToBottomCharge} = props
    const itemInputClass = ` h-4 w-full text-slate-200 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  border-0 focus:border-b-2  rounded-none text-xs `
    const entry_data_reducer: EntryData = useSelector((state: any) => state.entry_data_reducer);
    const instruction_data_reducer = useSelector((state: any) => state.instruction_data_reducer);
    const dispatch = useDispatch()
    const [specialInstructions, setSpecialInstructions] = useState<any>()
    const { errorToast } = useCustomToast()
    const [showInstModal, setShowInstModal] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    const inputClass = ` text-slate-800 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  text-xs border-0  pl-2 rounded-sm bg-slate-100 focus:bg-slate-200`
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const handleChange = (val: string, index: number, property: keyof Accessorial) => {

        if (val === "?") {
            setShowInstModal(true)
            setSelectedIndex(index)
            return
        }

        setSearch(val)
        dispatch(changeAccessorialData({ newValue: val, index, property: property }))

    }

    const handleAddAccessorial = () => {
        dispatch(addAccessorial())
      
        handleScrollToBottomCharge()

    }
    
    const handleRemoveChargeItem = (index:number) => {
        dispatch(removeChargeItem({index}))
    }


    const handleSelectInstruction = (ins_id: number) => {

        const filterSpecIns = specialInstructions?.filter((sp: any) => sp.id == ins_id)
        console.log(filterSpecIns)
        if (!filterSpecIns) return
        const newData: Accessorial = { code: filterSpecIns[0]?.code, description: filterSpecIns[0]?.description }

        console.log(newData)
        dispatch(setAccessorialData({ index: selectedIndex, newValue: newData }))
        console.log(filterSpecIns)
        setShowInstModal(false)

        if (!checkNullItems(entry_data_reducer.accOrIns)) {
            dispatch(addAccessorial())
        }
       
        handleScrollToBottomCharge()
    }

    
    const handleClose = () => {


        setShowInstModal(!showInstModal)
        

        // Delay focus to ensure the DOM has updated
        setTimeout(() => {
            focusNextInput(currentIndex)
        }, 0); // Delay by 0ms to push it to the next event loop cycle


    }
    useEffect(() => {

        const filtered = instruction_data_reducer.filter((ins: any) => ins.type === Charges_Type)
        console.log("FILTERED HERE 9393939", filtered)
        setSpecialInstructions(filtered)
    }, [instruction_data_reducer])

    // Handle Tab key press to open the modal
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number,currentIndex:number) => {
        if (e.key === 'Tab' || e.key === "Enter" || e.key === "ArrowDown") {
            if(search ==="") return 
            setCurrentIndex(currentIndex)
            const filterSpecIns = specialInstructions?.filter((sp: any) => sp.code === search.toUpperCase())

            if (filterSpecIns.length == 1) {
                const newData: Accessorial = { code: filterSpecIns[0]?.code, description: filterSpecIns[0]?.description }
                dispatch(setAccessorialData({ index: index, newValue: newData }))
                if (!checkNullItems(entry_data_reducer.accOrIns)) {
                    dispatch(addAccessorial())
                }
               
            
                return
            } else {
                if(search ==="") return 
                setSelectedIndex(index)

                e.preventDefault()
                setShowInstModal(true)
             
                // CHECK IF INPUTED
                let valid = isAccessorialTypeExist(instruction_data_reducer, search.toUpperCase())
                if (!valid) {
                    errorToast("Invalid Code", "Code does'nt exist", 3000)
                    dispatch(changeAccessorialData({ newValue: null, index, property: "code" }))
                }

            }




        }
    };


    return (
        <div className="mt-14">
            {/* INSTRUCTION MODAL */}
            <Dialog open={showInstModal} onOpenChange={handleClose}>

                <DialogContent className="sm:max-w-[600px] w-[600px] ">
                    <DialogHeader>
                        <DialogTitle>Special Instructions</DialogTitle>
                        <DialogDescription>
                            List of special Instructions
                            <div className="flex items-center gap-x-2  mt-3 ">

                                <Input placeholder="Search code . . ." value={search} className={`${inputClass}`} onChange={({ target }) => setSearch(target.value.toLocaleUpperCase())} />
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-96 overflow-scroll">

                        <Table className="border-b-2 mt-1">

                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead >Code </TableHead>
                                    <TableHead >Description</TableHead>
                                    <TableHead >Action</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    specialInstructions?.map((si: any, index: number) => si.type == Charges_Type && si.code.includes(search) && (
                                        <TableRow className="hover:bg-transparent" key={index} >
                                            <TableCell className="text-white">
                                                <Badge>
                                                    {si.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell >
                                                <p>{si.description}</p>
                                                <p>{si.type}</p>
                                            </TableCell>
                                            <TableCell >
                                                <MousePointerClickIcon onClick={() => handleSelectInstruction(si.id)} className="cursor-pointer" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }



                            </TableBody>
                        </Table>

                    </div>

                </DialogContent>
            </Dialog>


            <div className="flex justify-end">
                {/* <div className=" flex items-center gap-x-2">
                    <CaptionsIcon className=" w-5 h-5 text-white" />
                    <p className="text-white font-bold"> Charge Codes </p>
                </div> */}

                <Button size={"sm"} onClick={() => handleAddAccessorial()} className="bg-slate-300  text-slate-900 hover:bg-slate-300">
                    <PlusCircleIcon /> <p>Add</p>
                </Button>
            </div>
            <Table className="border-b-2">

                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-20">CODE</TableHead>
                        <TableHead className="min-w-[300px] w-[80%]">DESCRIPTION</TableHead>
                        <TableHead className="text-right" >ACTION</TableHead>      

                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        entry_data_reducer.accOrIns?.map((rn: Accessorial, index: number) => {

                            const item_count = entry_data_reducer.items?.length
                            const reference_count  = entry_data_reducer.referenceNumbers?.length

                            const item_length = !item_count ? 0: item_count * 8 + start_index 
                            const reference_length = !reference_count ? 0: reference_count * 5 
                            const currentStartIndex =  item_length + reference_length   + index * 2; // The tabIndex for each row will increment based on the row position
                        
                            return  (
                            <TableRow className="hover:bg-transparent" >
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.code || ""}
                                        tabIndex={currentStartIndex + 1}
                                        className={`${itemInputClass} accessorial-input`}
                                        // onChange={({ target }) => (target.value)}
                                        onChange={({ target }) => handleChange(target.value, index, "code")}
                                        // onBlur={() => onBlur(rn.code || "", index, "code")}
                                        onKeyDown={(e) => handleKeyDown(e, index,currentStartIndex + 1)}
                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.description || ""}
                                        tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass} accessorial-input`}
                                        onChange={({ target }) => handleChange(target.value, index, "description")}
                                    />
                                </TableCell>
                                <TableCell className=" flex justify-end">
                                <Trash2Icon onClick={()=>handleRemoveChargeItem(index)}  className=" cursor-pointer w-4 h-5 mr-3 text-red-600"/>
                                </TableCell>


                            </TableRow>
                        )
                        } 
                        )
                    }

                </TableBody>
            </Table>

        </div>

    )
}

export default Accessorials