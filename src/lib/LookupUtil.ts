export const Instruction_Type = "INSTRUCTION"
export const Reference_Type = "REFERENCE"
export const Charges_Type = "CHARGES"

export const isReferenceTypeExist= (instructions:any,code:string) => {

        const findIndex = instructions.findIndex((ins:any) => ins.code === code.toUpperCase() && ins.type === Reference_Type )

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

