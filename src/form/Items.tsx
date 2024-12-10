import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../components/ui/button"
import { LayoutListIcon, PlusCircleIcon } from "lucide-react"
import { EntryData, Items as ItemType } from "../types"
import { useDispatch, useSelector } from "react-redux"
import { addItems, changeItemData } from "../store/entryDataReducer"
import { Input } from "../components/ui/input"

type Props = {
    handleScrollToBottom : () => void
}
const itemInputClass = ` h-4 w-full text-slate-200 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0  border-0 focus:border-b-2  rounded-none text-xs `
const Items = (props: Props) => {

    const {handleScrollToBottom} = props

    const entry_data_reducer: EntryData = useSelector((state: any) => state.entry_data_reducer);
    const dispatch = useDispatch()
    let start_index = 43;
    const handleAddItem = () => {
        dispatch(addItems())
        handleScrollToBottom()
    }
    const handleChangeItem = (value: string, itemIndex: number, property: keyof ItemType) => {

        dispatch(changeItemData({ newValue: value, itemIndex, property: property }))

    }

    return (
        <div className="mt-14">
            <div className="flex justify-between">
            <div className=" flex items-center gap-x-2">
                    <LayoutListIcon className= " w-4 h-4 text-white" />
                <p className="text-white font-bold">Items </p>
                </div>
                <Button size={"sm"} onClick={() => handleAddItem()} className="bg-slate-300  text-slate-900 hover:bg-slate-300">
                    <PlusCircleIcon /> <p><span className=" underline">A</span>dd Item</p>
                </Button>
            </div>
            <Table>

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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        entry_data_reducer.items?.map((item: ItemType, index: number) => {
                            const currentStartIndex = start_index + index * 8; // The tabIndex for each row will increment based on the row position
                            return (
                                <TableRow className="hover:bg-transparent" key={index}>
                                    <TableCell><Input tabIndex={currentStartIndex + 1} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "charge")} value={item.charge || ""} /> </TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 2} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "pieces")} value={item.pieces || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 3} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "hm")} value={item.hm || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 4} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "ref")} value={item.ref || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 5} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "description")} value={item.description || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 6} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "weight")} value={item.weight || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 7} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "sqYds")} value={item.sqYds || ""} /></TableCell>
                                    <TableCell><Input tabIndex={currentStartIndex + 8} className={`${itemInputClass}`} onChange={({ target }) => handleChangeItem(target.value, index, "class")} value={item.class || ""} /></TableCell>
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