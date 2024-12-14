import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../components/ui/button"
import { LayoutListIcon, MousePointerClickIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import { EntryData, Items as ItemType } from "../types"
import { useDispatch, useSelector } from "react-redux"
import { addItems, changeItemData, removeItem, setItemData } from "../store/entryDataReducer"
import { Input } from "../components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Charges_Type, isAccessorialTypeExist } from "@/lib/LookupUtil"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import useCustomToast from "@/hooks/useCustomToast"
import { focusNextInput, start_index } from "@/lib/generalUtil"
import { checkNullItems } from "@/lib/validationUtils"

type Props = {
    handleScrollToBottom: () => void
}
const inputClass = ` text-slate-800 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  text-xs border-0  pl-2 rounded-sm bg-slate-100 focus:bg-slate-200`

const itemInputClass = ` h-4 w-full text-slate-200 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  border-0 focus:border-b-2  rounded-none text-xs `
const Items = (props: Props) => {

    const { handleScrollToBottom } = props

    const entry_data_reducer: EntryData = useSelector((state: any) => state.entry_data_reducer);
    const instruction_data_reducer = useSelector((state: any) => state.instruction_data_reducer);
    const [specialInstructions, setSpecialInstructions] = useState<any>()
    const [showInstModal, setShowInstModal] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    const dispatch = useDispatch()
    const { errorToast } = useCustomToast()
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const validForLookup = (index: number) => {
        if (!entry_data_reducer.items) return
        let data = entry_data_reducer.items[index]
        if (!data.weight && !data.description && !data.pieces) {

            return true
        }

    }
    const handleAddItem = () => {

        dispatch(addItems())
        handleScrollToBottom()


    }
    const handleChangeItem = (value: string, itemIndex: number, property: keyof ItemType) => {

        if (value === "?") {
            let valid = validForLookup(itemIndex);
            if (!valid) return
            setShowInstModal(true)
            setSelectedIndex(itemIndex)
            return
        }

        setSearch(value)
        dispatch(changeItemData({ newValue: value, itemIndex, property: property }))

    }

    const handleRemoveItem = (index: number) => {
        dispatch(removeItem({ index }))
    }
    const handleSelectInstruction = (ins_id: number) => {

        const filterSpecIns = specialInstructions?.filter((sp: any) => sp.id == ins_id)
        console.log(filterSpecIns)
        if (!filterSpecIns) return
        const newData: ItemType = {
            charge: filterSpecIns[0]?.code,
            pieces: null,
            hm: null,
            ref: null,
            description: filterSpecIns[0]?.description,
            weight: null,
            sqYds: null,
            class: null,
        }


        dispatch(setItemData({ index: selectedIndex, newValue: newData }))
        console.log(filterSpecIns)
        setShowInstModal(false)
        if (!checkNullItems(entry_data_reducer.items)) {
            dispatch(addItems())
        }
        setSearch("")
        // focusNextInput(currentIndex)
        // handleScrollToBottomCharge()
    }

    // Handle Tab key press to open the modal
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, currentIndex: number) => {

        if (e.key === 'Tab' || e.key === "Enter" || e.key === "ArrowDown") {
            if (search === "") return
            setCurrentIndex(currentIndex)
            let valid = validForLookup(index);
            if (!valid) return
            const filterSpecIns = specialInstructions?.filter((sp: any) => sp.code === search.toUpperCase())

            if (filterSpecIns.length == 1) {
                const newData: ItemType = {
                    charge: filterSpecIns[0]?.code,
                    pieces: null,
                    hm: null,
                    ref: null,
                    description: filterSpecIns[0]?.description,
                    weight: null,
                    sqYds: null,
                    class: null,
                }
                dispatch(setItemData({ index: index, newValue: newData }))

                if (!checkNullItems(entry_data_reducer.items)) {
                    dispatch(addItems())
                }
                setSearch("")
                return
            } else {
                if (search === "") return
                setSelectedIndex(index)

                e.preventDefault()
                setShowInstModal(true)

                // CHECK IF INPUTED
                let valid = isAccessorialTypeExist(instruction_data_reducer, search.toUpperCase())

                if (!valid) {
                    errorToast("Invalid Code", "Code does'nt exist", 3000)
                    dispatch(changeItemData({ newValue: null, itemIndex: index, property: "charge" }))
                }

            }




        }
    };

    const handleClose = () => {


        setShowInstModal(!showInstModal)
        

        // Delay focus to ensure the DOM has updated
        setTimeout(() => {
            focusNextInput(currentIndex)
            
        }, 0); // Delay by 0ms to push it to the next event loop cycle


    }
    useEffect(() => {

        const filtered = instruction_data_reducer.filter((ins: any) => ins.type === Charges_Type)

        setSpecialInstructions(filtered)
    }, [instruction_data_reducer])
    return (
        <div className="mt-14">
            {/* INSTRUCTION MODAL */}
            <Dialog open={showInstModal} onOpenChange={() => handleClose()}>

                <DialogContent className="sm:max-w-[600px] w-[600px] ">
                    <DialogHeader>
                        <DialogTitle>Charges Codes</DialogTitle>
                        <DialogDescription>
                            List of Charges Codes
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
            <div className="flex justify-between">
                <div className=" flex items-center gap-x-2">
                    <LayoutListIcon className=" w-4 h-4 text-white" />
                    <p className="text-white font-bold">Items </p>
                </div>
                <Button size={"sm"} onClick={() => handleAddItem()} className="bg-slate-300  text-slate-900 hover:bg-slate-300">
                    <PlusCircleIcon /> <p>Add</p>
                </Button>
            </div>
            <Table className="border-b-2 border-white">

                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead >CHARGE</TableHead>
                        <TableHead>PIECES</TableHead>
                        <TableHead>H/M</TableHead>
                        <TableHead>REF</TableHead>
                        <TableHead className="min-w-[300px]">DESCRIPTION</TableHead>
                        <TableHead >WEIGHT</TableHead>
                        <TableHead>SQ YADS</TableHead>
                        <TableHead>CLASS</TableHead>
                        <TableHead>ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        entry_data_reducer.items?.map((item: ItemType, index: number) => {
                            const currentStartIndex = start_index + index * 8; // The tabIndex for each row will increment based on the row position
                            return (
                                <TableRow className="hover:bg-transparent" key={index}>
                                    <TableCell><Input  tabIndex={currentStartIndex + 1} className={`${itemInputClass} item-input`} onKeyDown={(e) => handleKeyDown(e, index, currentStartIndex + 1)} onChange={({ target }) => handleChangeItem(target.value, index, "charge")} value={item.charge || ""} /> </TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 2} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "pieces")} value={item.pieces || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 3} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "hm")} value={item.hm || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 4} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "ref")} value={item.ref || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 5} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "description")} value={item.description || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 6} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "weight")} value={item.weight || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 7} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "sqYds")} value={item.sqYds || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 8} className={`${itemInputClass} item-input`} onChange={({ target }) => handleChangeItem(target.value, index, "class")} value={item.class || ""} /></TableCell>
                                    <TableCell className=" flex justify-end">
                                        <Trash2Icon onClick={() => handleRemoveItem(index)} className=" cursor-pointer w-4 h-5 mr-3 text-red-600" />
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

export default Items