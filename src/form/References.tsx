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
import { isReferenceTypeExist } from "@/lib/LookupUtil"
import { addReference, changeReferenceData } from "@/store/entryDataReducer"
import { EntryData, ReferenceNumbers } from "@/types"
import { BookMarkedIcon, PlusCircleIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

type Props = {}

const References = (props: Props) => {
    const itemInputClass = ` h-4 w-full text-slate-200 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  border-0 focus:border-b-2  rounded-none text-xs `
    const entry_data_reducer: EntryData = useSelector((state: any) => state.entry_data_reducer);
    const instruction_data_reducer = useSelector((state: any) => state.instruction_data_reducer);
    const {errorToast} = useCustomToast()
    const dispatch = useDispatch()

    const handleChange = (val: string, index: number, property: keyof ReferenceNumbers) => {
        // switch (property) {
        //     case 'id':
        //         let valid = isReferenceTypeExist(instruction_data_reducer,val)
        //         dispatch(changeReferenceData({ newValue: val, index, property: property }))
        //       break;
         
        //     default:
               
        //   }
       
          dispatch(changeReferenceData({ newValue: val, index, property: property }))
    }
    const onBlur = (val: string, index: number, property: keyof ReferenceNumbers) => {
         switch (property) {
            case 'id':
                let valid = isReferenceTypeExist(instruction_data_reducer,val)

                if(!valid){
                    errorToast("Invalid Code","Code does'nt exist",3000)
                    dispatch(changeReferenceData({ newValue: null, index, property: property }))

                }
                console.log(valid)
              //  dispatch(changeReferenceData({ newValue: val, index, property: property }))
              break;
         
            default:
               
          }
    }
    const handleAddRerefence = () => {
        dispatch(addReference())
        console.log(entry_data_reducer.referenceNumbers)
    }
    return (
        <div className="mt-9">

            <div className="flex justify-between">
                <div className=" flex items-center gap-x-2">
                    <BookMarkedIcon className= " w-4 h-4 text-white" />
                <p className="text-white font-bold">References </p>
                </div>
            
                <Button size={"sm"} onClick={() => handleAddRerefence()} className="bg-slate-300  text-slate-900 hover:bg-slate-300">
                    <PlusCircleIcon /> <p>Add Reference</p>
                </Button>
            </div>
            <Table className="border-b-2">

                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead >ID</TableHead>
                        <TableHead >VALUE</TableHead>
                        <TableHead>PIECES</TableHead>
                        <TableHead>WEIGHT</TableHead>
                        <TableHead className="min-w-[300px]">RELATED VALUE</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        entry_data_reducer.referenceNumbers?.map((rn: ReferenceNumbers, index: number) => (
                            <TableRow className="hover:bg-transparent" key={index} >
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.id || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "id")}
                                        onBlur={() => onBlur(rn.id ||"",index,"id")}
                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.value || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "value")}
                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.pieces || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "pieces")}

                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.weight || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "weight")}

                                    />
                                </TableCell>
                                <TableCell className="text-white">
                                    <Input
                                        value={rn.relatedValue || ""}
                                        //tabIndex={currentStartIndex + 2}
                                        className={`${itemInputClass}`}
                                        onChange={({ target }) => handleChange(target.value, index, "relatedValue")}

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

export default References