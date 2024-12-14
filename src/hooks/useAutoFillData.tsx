import { checkNullItems } from "@/lib/validationUtils";
import { addAccessorial, addItems, addReference, changeBillingInfo } from "@/store/entryDataReducer";
import { EntryData } from "@/types";
import { useDispatch } from "react-redux";

const useAutoFillData = () => {
    const dispatch = useDispatch()
    const fillData = (entry_data_reducer:EntryData) => {
        // JUST UPDATE THE PREPAID
        if (!entry_data_reducer.terms) return
        let val = entry_data_reducer.terms;
        const payload = { newValue: val.toString().charAt(0), property: "terms" }

        dispatch(changeBillingInfo(payload))


        dispatch(changeBillingInfo({ newValue: "GEN", property: "term" }))

        // AUTO ADD ROWS
        if (entry_data_reducer.items?.length === 0) {
            dispatch(addItems());
        } else {
            if (!checkNullItems(entry_data_reducer.items)) {
                dispatch(addItems());
            }
        }
        if (entry_data_reducer.referenceNumbers?.length === 0) {
            dispatch(addReference());
        } else {
            if (!checkNullItems(entry_data_reducer.referenceNumbers)) {
                dispatch(addReference());
            }
        }
        if (entry_data_reducer.accOrIns?.length === 0) {
            dispatch(addAccessorial());
        } else {
            if (!checkNullItems(entry_data_reducer.accOrIns)) {
                dispatch(addAccessorial());
            }
        }

    }

    return{
        fillData
    }
}

export default useAutoFillData