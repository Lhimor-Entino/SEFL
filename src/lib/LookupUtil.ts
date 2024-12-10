export const Accessorial_Type = "SPECIAL INSTRUCTION"
export const Reference_Type = "REFERENCE"
export const Other_Type = "OTHERS"

export const isReferenceTypeExist= (instructions:any,code:string) => {

        const findIndex = instructions.findIndex((ins:any) => ins.ins_code === code && ins.type === Reference_Type  ||
                         ins.charge_code === code && ins.type === Reference_Type  )

        if(findIndex !== -1){
            return true
        } 
        return false
}

export const isAccessorialTypeExist= (instructions:any,code:string) => {

    const findIndex = instructions.findIndex((ins:any) => ins.ins_code === code  && ins.type === Accessorial_Type  || 
    ins.charge_code === code && ins.type === Other_Type )

    if(findIndex !== -1){
        return true
    } 
    return false
}

