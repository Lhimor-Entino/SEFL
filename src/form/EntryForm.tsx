
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,

} from "@/components/ui/command"

import Items from "@/form/Items"
import { addInstruction, changeBillingAccountInfoData, changeBillingInfo, updateInstruction } from "@/store/entryDataReducer"

import { EntryData } from "@/types"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import useBottomDivAutoScroll from "@/hooks/useBottomDivAutoScroll"
import useShortcutKeys from "@/hooks/keyboardHooks/useShortcutKeys"
import { ListCollapseIcon, Trash2Icon } from "lucide-react"
import References from "./References"
import Accessorials from "./Accessorials"

import useInstructionLookup from "@/hooks/api/useInstructionLookup"
import { validateInputField } from "@/lib/validationUtils"
import { Instruction_Type, isSHCTypeExist, isStateExist, } from "@/lib/LookupUtil"
import useCustomToast from "@/hooks/useCustomToast"
import useAutoFillData from "@/hooks/useAutoFillData"


const inputClass = `text-slate-200 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  text-xs border-0  border-b-4 border-slate-500 pl-2 rounded-sm focus:bg-slate-600`
const inputClass2 = `text-slate-200 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs rounded-none border-0 pl-2  border-b-4 border-slate-500 rounded-sm  focus:bg-slate-600`
type Props = {}

function EntryForm({ }: Props) {
    const entry_data_reducer: EntryData = useSelector((state: any) => state.entry_data_reducer);
    const instruction_data_reducer = useSelector((state: any) => state.instruction_data_reducer);
    const dispatch = useDispatch();
    const {fillData} = useAutoFillData()
    const { getInstructions } = useInstructionLookup()

    const [specIns, setSpecIns] = useState<string>("")
    const { divRef, divRef2, divRef3,topRef,handleScrollToTop, handleScrollToBottomRef, handleScrollToBottom, handleScrollToBottomCharge } = useBottomDivAutoScroll()
    const [specialInstructions, setSpecialInstructions] = useState<any>()
    const [instOpen, setInstOpen] = useState<boolean>(true)
    const { errorToast } = useCustomToast()
    const isFilled = (value: string) => {

        if (!value) return ''
        if (value.trim().length < 1) return ''
        return 'bg-slate-800'
    }

    const handleAccountChange = (value: string, parent_property: string, child_property: string) => {
        const payload = { newValue: value, parent_property: parent_property, child_property: child_property, }
        console.log(payload)
        dispatch(changeBillingAccountInfoData(payload))
    }

    const handleOtherInfoChange = (value: string, property: string) => {
        if(property ==="proNumber"){
            if(value.length>= 10){
                return
            }
        }
        const payload = { newValue: value.toUpperCase(), property: property }
        dispatch(changeBillingInfo(payload))


    }
    const handleAddInstruction = (ins: any) => {

        dispatch(addInstruction({ newValue: ins.description }))
        setSpecIns(ins.code)
        setInstOpen(false)
        setSpecIns("")
    }

    const removeSpecialInstruction = (index_: number) => {
        const filtered = entry_data_reducer.specialInstructions?.filter((_sp: any, index: number) => index !== index_)

        dispatch(updateInstruction({ newValue: filtered }))
    }

    const validateField = (e: React.KeyboardEvent<HTMLInputElement>, property?: string) => {


      
            let value = e.key
           
            let res = validateInputField(value,property)
            
            if (res == "error") {
                e.preventDefault()
            }
      

    }

    const onBlur = (val: string, property: keyof EntryData, parent_property?: string) => {

        switch (property) {
            case 'shc':

                if (val === "") return
                const format_shc = val.length === 1 ? "0" + val : val
                let valid = isSHCTypeExist(instruction_data_reducer, format_shc)

                if (!valid) {
                    errorToast("Invalid Code", "SHC Code does'nt exist", 3000)

                    const payload = { newValue: null, property: property }
                    dispatch(changeBillingInfo(payload))


                    return
                }

                dispatch(changeBillingInfo({ newValue: val.toUpperCase(), property: property }))
                break;

            case 'state':

                if (val === "") return
                let valid_state = isStateExist(instruction_data_reducer, val)

                if (!valid_state) {
                    errorToast("Invalid Code", parent_property?.toUpperCase() + " STATE Code does'nt exist", 3000)

                    dispatch(changeBillingAccountInfoData({ newValue: null, parent_property: parent_property, child_property: property, }))


                    return
                }


                dispatch(changeBillingAccountInfoData({ newValue: val, parent_property: parent_property, child_property: property, }))

                break;
            default:

        }
    }


    useEffect(() => {
        const filtered = instruction_data_reducer.filter((ins: any) => ins.type == Instruction_Type)
        setSpecialInstructions(filtered)
    }, [instruction_data_reducer])

    useEffect(() => {
        setInstOpen(true)
    }, [specIns])

    // AUTO FILL FIELDS ON LOAD
    useEffect(() => {
        fillData(entry_data_reducer)
    }, [entry_data_reducer])

    useEffect(() => {
        getInstructions()

        if (!entry_data_reducer) return

    }, [])


    const validatePro = (e: React.KeyboardEvent<HTMLInputElement>, _property?: string) => {
        const regex = /^\d{0,9}$/; // Allow up to 9 digits temporarily
        let val = e.key; // Simulate the input value after the key is pressed
        
        // Check if the resulting value matches the allowed pattern
        if (regex.test(val) || e.key === 'Backspace' || e.key === 'Delete' || e.key ==="ArrowLeft" || e.key ==="ArrowRight") {
          // Allow input if it matches or if the key is Backspace/Delete
        } else {
          e.preventDefault();
        }
    }
    // BINDING
    useShortcutKeys({ handleScrollToBottom, handleScrollToBottomRef, handleScrollToBottomCharge,handleScrollToTop })
    return (
        <div className="h-[clamp(500px,80vh,1000px)] overflow-y-scroll entry__form mt-2 ">
             <div ref={topRef} ></div>
            <div className=" grid grid-flow-col grid-cols-6 gap-x-4 ">
                <div className="grid grid-flow-col space-y-1.5 space-x-2">
                    <Label htmlFor="proNumber" className="w-fit text-xs text-white" style={{ marginTop: "15px" }}>PRO : </Label>
                    <Input autoFocus id="proNumber"
                        onKeyDown={(e) => validatePro(e, "proNumber")}
                        onChange={({ target }) => handleOtherInfoChange(target.value, "proNumber")}
                        value={entry_data_reducer.proNumber || ''} tabIndex={1} style={{ height: "25px" }}
                        className={`${inputClass} ${isFilled(entry_data_reducer.proNumber || '')}`} />
                </div>
                {/* <p className="text-white">{JSON.stringify(entry_data_reducer)}</p> */}
                <div className="grid grid-flow-col space-y-1.5 space-x-2" >
                    <Label htmlFor="TYPE" className="w-fit text-xs text-white" style={{ marginTop: "15px" }}>TYPE : </Label>
                    <Input id="TYPE" tabIndex={2}
                        onChange={({ target }) => handleOtherInfoChange(target.value, "type")}
                        value={entry_data_reducer.type || ''} style={{ height: "25px" }}
                        className={`${inputClass} ${isFilled(entry_data_reducer.type || '')}`} />
                </div>
                <div className=" col-span-2 grid grid-flow-col space-y-1.5 space-x-2">
                    <Label htmlFor="MASTER" className="w-fit text-xs text-white" style={{ marginTop: "15px" }}>MASTER PRO : </Label>
                    <Input id="MASTER" tabIndex={3}
                        onChange={({ target }) => handleOtherInfoChange(target.value, "masterProNumber")}
                        value={entry_data_reducer.masterProNumber || ''} style={{ height: "25px" }}
                        className={`${inputClass} ${isFilled(entry_data_reducer.masterProNumber || '')}`} />
                </div>
                <div className="grid grid-flow-col space-y-1.5 space-x-2" >
                    <Label htmlFor="OSD" className="w-fit text-xs text-white" style={{ marginTop: "15px" }}>OSD : </Label>
                    <Input id="OSD"
                        onChange={({ target }) => handleOtherInfoChange(target.value, "osd")}
                        tabIndex={4} value={entry_data_reducer.osd || ''} style={{ height: "25px" }}
                        className={`${inputClass} ${isFilled(entry_data_reducer.osd || '')}`} />
                </div>
                <div className="grid grid-flow-col space-y-1.5 space-x-2" >
                    <Label htmlFor="terms" className="w-fit text-xs text-white" style={{ marginTop: "15px" }}>P/C : </Label>
                    <Input id="terms" tabIndex={5}
                        onChange={({ target }) => handleOtherInfoChange(target.value, "terms")}
                        value={entry_data_reducer.terms || ''} style={{ height: "25px" }}
                        className={`${inputClass} ${isFilled(entry_data_reducer.terms?.toString() || '')}`} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 mt-3">
                {/* SHIPPER */}
                <div className="flex flex-col gap-y-2">
                    <Input id="shipTo_name" tabIndex={6}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "shipper", "name")}
                        value={entry_data_reducer.shipper?.name || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.shipper?.name || '')}`} />
                    <Input id="shipTo_address1" tabIndex={7}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "shipper", "address1")}
                        value={entry_data_reducer.shipper?.address1 || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.shipper?.address1 || '')}`} />
                    <Input id="shipTo_address2" tabIndex={8}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "shipper", "address2")}
                        value={entry_data_reducer.shipper?.address2 || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.shipper?.address2 || '')}`} />
                    {/* <Input id="shipTo_contactNumber" tabIndex={9}
                        onChange={({ target }) => handleAccountChange(target.value, "shipper", "contactName")}
                        value={entry_data_reducer.shipper?.contactName || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.shipper?.contactName || '')}`} /> */}

                    <div className="grid grid-cols-3 gap-x-4">
                        <Input id="shipTo_city" tabIndex={10}
                            onChange={({ target }) => handleAccountChange(target.value, "shipper", "city")}
                            value={entry_data_reducer.shipper?.city || ''}
                            className={`  col-span-2 ${inputClass2} ${isFilled(entry_data_reducer.shipper?.city || '')}`} />
                        <Input id="shipTo_state" tabIndex={11}
                            onBlur={() => onBlur(entry_data_reducer.shipper?.state || '', 'state', "shipper")}
                            onChange={({ target }) => handleAccountChange(target.value, "shipper", "state")}
                            value={entry_data_reducer.shipper?.state || ''}
                            className={`${inputClass2} ${isFilled(entry_data_reducer.shipper?.state || '')}`} />
                    </div>

                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="ship" className="w-fit text-white" style={{ marginTop: "15px" }}>SHIP : </Label>
                        <Input id="ship" tabIndex={12}
                            onChange={({ target }) => handleAccountChange(target.value, "shipper", "zip")}
                            value={entry_data_reducer.shipper?.zip || ''} style={{ height: "25px" }}
                            className={`${inputClass2} ${isFilled(entry_data_reducer.shipper?.zip || '')}`} />
                    </div>

                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="billClerk" className="w-fit text-white" style={{ marginTop: "15px" }}>BILL CLERK : </Label>
                        <Input id="billClerk" tabIndex={13}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "billClerk")}
                            value={entry_data_reducer.billClerk || ''} style={{ height: "25px" }}
                            className={`${inputClass2} ${isFilled(entry_data_reducer.billClerk || '')}`} />
                    </div>

                    <div className="flex gap-x-2">
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="il" className="w-fit text-white" style={{ marginTop: "15px" }}>I/L : </Label>
                            <Input id="il" tabIndex={14}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "il")}
                                value={entry_data_reducer.il || ''} style={{ height: "25px" }}
                                className={`${inputClass2} ${isFilled(entry_data_reducer.il || '')}`} />
                        </div>
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="date" className="w-fit text-white" style={{ marginTop: "15px" }}>DATE : </Label>
                            <Input id="date" tabIndex={15}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "date")}
                                placeholder="mm/dd/yy"
                                value={entry_data_reducer.date || ''} style={{ height: "25px" }}
                                className={`${inputClass2} ${isFilled(entry_data_reducer.date || '')}`} />
                        </div>
                    </div>

                    <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                        <Label htmlFor="pickupDate" className="w-fit text-white" style={{ marginTop: "15px" }}> PICK UP DATE : </Label>
                        <Input id="pickupDate" tabIndex={16}
                            placeholder="mm/dd/yy"
                            onChange={({ target }) => handleOtherInfoChange(target.value, "pickupDate")}
                            value={entry_data_reducer.pickupDate || ''} style={{ height: "25px" }}
                            className={`${inputClass2} ${isFilled(entry_data_reducer.pickupDate || '')}`} />
                    </div>

                </div>
                {/* CONSIGNEE */}
                <div className="flex flex-col gap-y-2">
                    <Input id="consignee.name" tabIndex={17}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "consignee", "name")}
                        value={entry_data_reducer.consignee?.name || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.consignee?.name || '')}`} />



                    <Input id="consignee.address1" tabIndex={18}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "consignee", "address1")}
                        value={entry_data_reducer.consignee?.address1 || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.consignee?.address1 || '')}`} />
                    <Input id="consignee.address2" tabIndex={19}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "consignee", "address2")}
                        value={entry_data_reducer.consignee?.address2 || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.consignee?.address2 || '')}`} />
                    {/* <Input id="consignee.contactNumber" tabIndex={20}
                        onChange={({ target }) => handleAccountChange(target.value, "consignee", "contactName")}
                        value={entry_data_reducer.consignee?.contactName || ''}
                        className={`${inputClass} ${isFilled(entry_data_reducer.consignee?.contactName || '')}`} /> */}
                    <div className="grid grid-cols-3 gap-x-4">
                        <Input id="consignee.city" tabIndex={21}
                            onChange={({ target }) => handleAccountChange(target.value, "consignee", "city")}
                            value={entry_data_reducer.consignee?.city || ''}
                            className={` col-span-2 ${inputClass2} ${isFilled(entry_data_reducer.consignee?.city || '')}`} />
                        <Input id="consignee.state" tabIndex={22}
                            onBlur={() => onBlur(entry_data_reducer.consignee?.state || '', 'state', "consignee")}
                            onChange={({ target }) => handleAccountChange(target.value, "consignee", "state")}
                            value={entry_data_reducer.consignee?.state || ''}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.consignee?.city || '')}`} />
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="consignee.zip" className="w-fit text-white" style={{ marginTop: "15px" }}>CONS : </Label>
                        <Input id="consignee.zip" tabIndex={23}
                            onChange={({ target }) => handleAccountChange(target.value, "consignee", "zip")}
                            value={entry_data_reducer.consignee?.zip || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.consignee?.zip || '')}`} />
                    </div>

                    <div className="flex gap-x-2">
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="term" className="w-fit text-white" style={{ marginTop: "15px" }}>TERM : </Label>
                            <Input id="term" tabIndex={24}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "term")}
                                value={entry_data_reducer.term || ''} style={{ height: "25px" }}
                                className={` ${inputClass2} ${isFilled(entry_data_reducer.term || '')}`} />
                        </div>
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="weight" className="w-fit text-white" style={{ marginTop: "15px" }}>WEIGHT : </Label>
                            <Input id="weight" tabIndex={25}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "weight")}
                                value={entry_data_reducer.weight || ''} style={{ height: "25px" }}

                                className={` ${inputClass2} ${isFilled(entry_data_reducer.weight?.toString() || "")}`} />
                        </div>
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="ilPro" className="w-fit text-white" style={{ marginTop: "15px" }}>I/L PRO : </Label>
                        <Input id="ilPro" tabIndex={26}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "ilPro")}
                            value={entry_data_reducer.ilPro || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.ilPro || '')}`} />
                    </div>
                    <div className="flex gap-x-2">
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="orig" className="w-fit text-white" style={{ marginTop: "15px" }}>ORIG : </Label>
                            <Input id="orig" tabIndex={27}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "orig")}
                                value={entry_data_reducer.orig || ''} style={{ height: "25px" }}
                                className={` ${inputClass2} ${isFilled(entry_data_reducer.orig || '')}`} />
                        </div>
                        <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                            <Label htmlFor="dest" className="w-fit text-white" style={{ marginTop: "15px" }}>DEST : </Label>
                            <Input id="dest" tabIndex={28}
                                onChange={({ target }) => handleOtherInfoChange(target.value, "dest")}
                                value={entry_data_reducer.dest || ''} style={{ height: "25px" }}
                                className={` ${inputClass2} ${isFilled(entry_data_reducer.dest || '')}`} />
                        </div>
                    </div>
                </div>
                {/* BILL TO */}
                <div className="flex flex-col gap-y-2">
                    <Input id="billto.name" tabIndex={29}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "billTo", "name")}
                        value={entry_data_reducer.billTo?.name || ''}
                        className={` ${inputClass} ${isFilled(entry_data_reducer.billTo?.name || '')}`} />
                    <Input id="billto.address1" tabIndex={30}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "billTo", "address1")}
                        value={entry_data_reducer.billTo?.address1 || ''}
                        className={` ${inputClass} ${isFilled(entry_data_reducer.billTo?.address1 || '')}`} />
                    <Input id="billto.address2" tabIndex={31}
                        onKeyDown={(e) => validateField(e)}
                        onChange={({ target }) => handleAccountChange(target.value, "billTo", "address2")}
                        value={entry_data_reducer.billTo?.address2 || ''}
                        className={` ${inputClass} ${isFilled(entry_data_reducer.billTo?.address2 || '')}`} />
                    {/* <Input id="billto.contactNumber" tabIndex={32}
                        onChange={({ target }) => handleAccountChange(target.value, "billTo", "contactName")}
                        value={entry_data_reducer.billTo?.contactName || ''}
                        className={` ${inputClass} ${isFilled(entry_data_reducer.billTo?.contactName || '')}`} /> */}
                    <div className="grid grid-cols-3 gap-x-4">
                        <Input id="billto.city" tabIndex={33}
                            onChange={({ target }) => handleAccountChange(target.value, "billTo", "city")}
                            value={entry_data_reducer.billTo?.city || ''}
                            className={` col-span-2 ${inputClass2} ${isFilled(entry_data_reducer.billTo?.city || '')}`} />
                        <Input id="billto.state" tabIndex={34}
                            onBlur={() => onBlur(entry_data_reducer.billTo?.state || '', 'state', "billTo")}
                            onChange={({ target }) => handleAccountChange(target.value, "billTo", "state")}
                            value={entry_data_reducer.billTo?.state || ''}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.billTo?.state || '')}`} />
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="billto.zip" className="w-fit text-white" style={{ marginTop: "15px" }}>BLTO : </Label>
                        <Input id="billto.zip" tabIndex={35}
                            onChange={({ target }) => handleAccountChange(target.value, "billTo", "zip")}
                            value={entry_data_reducer.billTo?.zip || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.billTo?.zip || '')}`} />
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="puTrailer" className="w-fit text-white" style={{ marginTop: "15px" }}>PU TRAILER : </Label>
                        <Input id="puTrailer" tabIndex={36}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "puTrailer")}
                            value={entry_data_reducer.puTrailer || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.puTrailer || '')}`} />
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="bills" className="w-fit text-white" style={{ marginTop: "15px" }}>BILLS : </Label>
                        <Input id="bills" tabIndex={37}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "bills")}
                            value={entry_data_reducer.bills || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.bills?.toString() || '')}`} />
                    </div>
                    <div className="grid grid-flow-col space-y-1.5">
                        <Label htmlFor="SHC" className="w-fit text-white" style={{ marginTop: "15px" }}>SHC : </Label>
                        <Input id="SHC" tabIndex={38}
                            onBlur={() => onBlur(entry_data_reducer.shc || "", "shc")}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "shc")}
                            value={entry_data_reducer.shc || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.shc || '')}`} />

                        {/* <Popover  >
                            <PopoverTrigger className="text-white w-full ">

                                <Input id="SHC" tabIndex={38}
                                    onFocus={() => { }}
                                    onChange={({ target }) => handleOtherInfoChange(target.value, "shc")}
                                    value={entry_data_reducer.shc || ''} style={{ height: "25px" }}
                                    className={` ${inputClass2} ${isFilled(entry_data_reducer.shc || '')}`} />

                            </PopoverTrigger>
                            <PopoverContent className="w-full flex gap-y-3 flex-col">
                                <p>SHC Codes</p>
                                <div className="flex gap-x-2">
                                    {
                                        instruction_data_reducer?.map((ins: any, index: number) => ins.type === "SHC" && (
                                            <Button key={index} >
                                                {ins.code}
                                            </Button>
                                        ))
                                    }
                                </div>

                            </PopoverContent>
                        </Popover> */}
                        {/* <Select onValueChange={(value) => handleShcChange(value)}  >
                            <SelectTrigger className="w-[180px] bg-transparent h-5 p-2 py-3 text-white">
                                <SelectValue tabIndex={38} placeholder="Select Code" className="bg-transparent" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel className="bg-slate-400 text-white rounded-sm">SHC LIST</SelectLabel>

                                    {
                                        instruction_data_reducer.map((ins: any, _index: number) => ins.type === Shc &&
                                            <SelectItem value={ins.code} className="aria-selected:bg-blue-500 aria-selected:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-white">{ins.code}</SelectItem>
                                        )
                                    }
                                </SelectGroup>


                            </SelectContent>
                        </Select> */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 mt-5">

                <div className="grid grid-flow-col space-y-1.5 relative">

                    <Label htmlFor="spec_ins" className="w-fit text-white" style={{ marginTop: "15px" }}>SPEC INS: </Label>


                    <Input id="spec_ins" value={specIns} onChange={({ target }) => setSpecIns(target.value)} tabIndex={39} style={{ height: "25px" }}
                        className={`${inputClass2} ml-1`} />

                    {
                        specIns.length > 0 && instOpen && (
                            <Command className="w-fit h-fit z-40 absolute top-8">
                                <CommandList>
                                    <CommandGroup heading="Instructions">
                                        {
                                            specialInstructions.map((ins: any, index: number) =>
                                                ins.code.includes(specIns.toUpperCase()) && (
                                                    <CommandItem key={index}> <Button size={"sm"} className="w-full text-xs " onClick={() => handleAddInstruction(ins)}>{ins.description}</Button></CommandItem>
                                                )
                                            )
                                        }
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        )
                    }

                </div>


                <div className="flex gap-x-2">
                    <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                        <Label htmlFor="plt" className="w-fit text-white" style={{ marginTop: "15px" }}>PLT : </Label>
                        <Input id="plt" tabIndex={40}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "plt")}
                            value={entry_data_reducer.plt || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.plt?.toString() || '')}`} />

                    </div>
                    <div className="grid grid-flow-col space-y-1.5 gap-x-2">
                        <Label htmlFor="lpsc" className="w-fit text-white" style={{ marginTop: "15px" }}>LPCS : </Label>
                        <Input id="lpsc" tabIndex={41}
                            onChange={({ target }) => handleOtherInfoChange(target.value, "lpsc")}
                            value={entry_data_reducer.lpsc || ''} style={{ height: "25px" }}
                            className={` ${inputClass2} ${isFilled(entry_data_reducer.lpsc || '')}`} />

                    </div>
                </div>

                <div className="grid grid-flow-col space-y-1.5">
                    <Label htmlFor="tpcs" className="w-fit text-white" style={{ marginTop: "15px" }}>TPCS : </Label>
                    <Input id="tpcs" tabIndex={42}
                        onChange={({ target }) => handleOtherInfoChange(target.value, "tpcs")}
                        value={entry_data_reducer.tpcs || ''} style={{ height: "25px" }}
                        className={` ${inputClass2} ${isFilled(entry_data_reducer.tpcs?.toString() || '')}`} />

                </div>
            </div>

            <div className="flex flex-col gap-y-1 border border-1 p-1 pl-3 pr-3 rounded-md mt-4 border-white">
                <div className="flex items-center gap-x-2">
                    <ListCollapseIcon className="text-white w-4 h-4" />
                    <p className="text-white font-bold">Instructions</p>
                </div>

                {
                    entry_data_reducer?.specialInstructions?.map((ins: any, index: number) => (
                        <div className="flex items-center gap-x-2 mt-1" key={index}>
                            <Trash2Icon onClick={() => removeSpecialInstruction(index)} className="text-red-600 w-8 h-8 cursor-pointer hover:bg-slate-800 p-2 rounded-full" />
                            <p className="text-white text-[.8rem]" key={index}>  {ins}</p>

                        </div>)
                    )
                }

            </div>


            <Items handleScrollToBottom={handleScrollToBottom} />
            <div ref={divRef} className="mb-36  -mt-20" ></div>
            <References handleScrollToBottomRef={handleScrollToBottomRef} />
            <div ref={divRef2} className=" mb-36  -mt-20" ></div>
            <Accessorials handleScrollToBottomCharge={handleScrollToBottomCharge} />
            <div ref={divRef3} className="mb-16 border-2  " ></div>
            {/* Placeholder for the bottom to scroll to */}

        </div>
    )
}

export default EntryForm