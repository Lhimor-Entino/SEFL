export const Instruction_Type = "INSTRUCTION"
export const Reference_Type = "REFERENCE"
export const Charges_Type = "CHARGES"
export const Shc = "SHC"
export const Reject = "REJECT"
export const State = "STATE"
export const isReferenceTypeExist= (instructions:any,code:string) => {

        const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase() && ins.type === Reference_Type )

        if(findIndex !== -1){
            return true
        } 
        return false
}
export const isSHCTypeExist= (instructions:any,code:string) => {

    const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase() && ins.type === Shc )

    if(findIndex !== -1){
        return true
    } 
    return false
}
export const isStateExist= (instructions:any,code:string) => {

    const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase() && ins.type === State )

    if(findIndex !== -1){
        return true
    } 
    return false
}

export const isAccessorialTypeExist= (instructions:any,code:string) => {

    const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase()  && ins.type === Charges_Type )

    if(findIndex !== -1){
        return true
    } 
    return false
}

export const isShc= (instructions:any,code:string) => {

    const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase()  && ins.type === Shc )

    if(findIndex !== -1){
        return true
    } 
    return false
}



