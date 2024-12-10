
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { entry_data } from "@/data"
import useCustomToast from "@/hooks/useCustomToast"
import { Accessorial_Type, isAccessorialTypeExist, Other_Type } from "@/lib/LookupUtil"
import { addAccessorial, addReference, changeAccessorialData, changeReferenceData, setAccessorialData } from "@/store/entryDataReducer"
import { Accessorial, EntryData, ReferenceNumbers } from "@/types"
import { BookMarkedIcon, CaptionsIcon, MousePointerClickIcon, PlusCircleIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type Props = {}

const Accessorials = (_props: Props) => {
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

    const handleChange = (val: string, index: number, property: keyof Accessorial) => {

        if (val === "?") {
            setShowInstModal(true)
            setSelectedIndex(index)
            return
        }
        // if (property === "code") {

        //     const filterSpecIns = specialInstructions?.filter((sp: any) => sp.ins_code === val)

        //     if (!filterSpecIns) return
        //     const newData: Accessorial = { code: filterSpecIns[0]?.ins_code, description: filterSpecIns[0]?.description }

        //     console.log(newData)
        //     dispatch(setAccessorialData({ index: index, newValue: newData }))
        //     console.log(filterSpecIns)
        // } 
        setSearch(val)
        dispatch(changeAccessorialData({ newValue: val, index, property: property }))

    }



    const handleAddAccessorial = () => {
        dispatch(addAccessorial())
        console.log(entry_data_reducer.accOrIns)

    }
    // const onBlur = (val: string, index: number, property: keyof Accessorial) => {
    //     switch (property) {
    //         case 'code':

    //             if (showInstModal) return
    //             let valid = isAccessorialTypeExist(instruction_data_reducer, val.toUpperCase())

    //             if (!valid) {
    //                 errorToast("Invalid Code", "Code does'nt exist", 3000)
    //                 dispatch(changeAccessorialData({ newValue: null, index, property: property }))

    //             }
    //             console.log(valid)
    //             //  dispatch(changeReferenceData({ newValue: val, index, property: property }))
    //             break;

    //         default:

    //     }
    // }

    const handleSelectInstruction = (ins_id: number) => {

        const filterSpecIns = specialInstructions?.filter((sp: any) => sp.id == ins_id)
        console.log(filterSpecIns)
        if (!filterSpecIns) return
        const newData: Accessorial = { code: filterSpecIns[0]?.ins_code, description: filterSpecIns[0]?.description }

        console.log(newData)
        dispatch(setAccessorialData({ index: selectedIndex, newValue: newData }))
        console.log(filterSpecIns)
        setShowInstModal(false)
        dispatch(addAccessorial())
    }
    useEffect(() => {
        const filtered = instruction_data_reducer.filter((ins: any) => ins.type == Accessorial_Type || ins.type == Other_Type)
        console.log("FILTERED HERE 9393939", filtered)
        setSpecialInstructions(filtered)
    }, [instruction_data_reducer])

    // Handle Tab key press to open the modal
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Tab') {

            const filterSpecIns = specialInstructions?.filter((sp: any) => sp.ins_code === search.toUpperCase() || sp.charge_code === search.toUpperCase())

            if (filterSpecIns.length == 1) {
                const newData: Accessorial = { code: filterSpecIns[0]?.ins_code, description: filterSpecIns[0]?.description }


                dispatch(setAccessorialData({ index: index, newValue: newData }))
                dispatch(addAccessorial())
                return
            } else {
                // CHECK IF INPUTED
                let valid = isAccessorialTypeExist(instruction_data_reducer, search.toUpperCase())
                if (!valid) {
                    errorToast("Invalid Code", "Code does'nt exist", 3000)
                    dispatch(changeAccessorialData({ newValue: null, index, property: "code" }))
                }

                setSelectedIndex(index)

                e.preventDefault()
                setShowInstModal(true)
            }




        }
    };


    return (
        <div className="mt-14">
            {/* INSTRUCTION MODAL */}
            <Dialog open={showInstModal} onOpenChange={() => setShowInstModal(!showInstModal)}>

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
                                    <TableHead >Code</TableHead>
                                    <TableHead >Description</TableHead>
                                    <TableHead >Action</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    specialInstructions?.map((si: any, index: number) => si.type == Accessorial_Type && si.ins_code.includes(search)
                                        || si.type === Other_Type && si.ins_code.includes(search) && (

                                            <TableRow className="hover:bg-transparent" key={index} >
                                                <TableCell className="text-white">
                                                    <Badge>
                                                        {si.ins_code || si.charge_code}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell >
                                                    <p>{si.description}</p>
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


            <div className="flex justify-between">
                <div className=" flex items-center gap-x-2">
                    <CaptionsIcon className=" w-5 h-5 text-white" />
                    <p className="text-white font-bold">Accessorial </p>
                </div>

                <Button size={"sm"} onClick={() => handleAddAccessorial()} className="bg-slate-300  text-slate-900 hover:bg-slate-300">
                    <PlusCircleIcon /> <p>Add Accessorial</p>
                </Button>
            </div>
            <Table className="border-b-2">

                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-20">CODE</TableHead>
                        <TableHead className="min-w-[300px]">DESCRIPTION</TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        entry_data_reducer.accOrIns?.map((rn: Accessorial, index: number) => (
                            <TableRow className="hover:bg-transparent" >
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.code || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        // onChange={({ target }) => (target.value)}
                                        onChange={({ target }) => handleChange(target.value, index, "code")}
                                        // onBlur={() => onBlur(rn.code || "", index, "code")}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.description || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "description")}
                                    />
                                </TableCell>



                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </div>

    )
}

export default Accessorials