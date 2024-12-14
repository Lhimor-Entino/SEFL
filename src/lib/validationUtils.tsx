import { Items } from "@/types";

export const account_field_property = ["name", "address1", "address2"]

export const checkNullItems = (array: any): boolean => {
    const hasAllKeysNull = array.some((obj: any) =>
        Object.values(obj).every(value => value === null || value === "")
    );

    console.log(array)
    return hasAllKeysNull
}
export const checkIfProIsNulloRInvalid = (entry_data: any) => {
    if (!entry_data.proNumber || entry_data.proNumber.trim() === "") {
        return true
    }
    if(entry_data.proNumber.length< 7){
        return true
    }
    return false;
}
export const itemHasTTL = (data: any) => {

    let items = data.items

    if (items.length < 1) return true
    const hasTTL = items?.findIndex((it: Items) => it.charge === "TTL")

    if (hasTTL !== -1) {
        return true
    } else {
        return false
    }
}
export const validateProNumber = (val: string) => {

    const regex = /^\d{7,9}$/;

    // Check if input matches the regex for 7, 8, or 9 digits
    if (regex.test(val) || val === '') {
        return val

    }
    return "error"
}
export const validateShc = (val: string) => {
    const regex = /^\d{7,9}$/;

    // Check if input matches the regex for 7, 8, or 9 digits
    if (regex.test(val) || val === '') {
        return val

    }
    return "error"
}
export const validateAccountField = (val: string) => {
    const regex = /^[A-Za-z0-9 .%-]*$/;

    if (regex.test(val)) {

        return val
    }
    return "error"
}

export const validateInputField = (val: string, property?: string) => {

    if (!property) {
        // MEANS ACCOUNT FILES
        let res = validateAccountField(val)
        return res
    } else {
        if (property === "proNumber") {

            let res = validateProNumber(val)
            return res
        }
    }
}