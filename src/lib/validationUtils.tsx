export const account_field_property = ["name","address1","address2"] 

export const validateProNumber = (val: string) => {
    const regex = /^\d{7,9}$/;

    // Check if input matches the regex for 7, 8, or 9 digits
    if (regex.test(val) || val === '') {
        return val

    }
    return "error"
}

export const validateAccountField = (val: string) => {
    const regex = /^[A-Za-z0-9.-]*$/; // Allow empty input too
  
    if (regex.test(val)) {
    
        return val
    }
    return "error"
}