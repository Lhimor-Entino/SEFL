export interface Items {
  charge?: string | null,
  pieces?: string | number,
  hm?: string | null | number,
  ref?: string | null,
  description?: string | null,
  weight?: string | null | number,
  sqYds?: string | null | number,
  class?: string | null
}

export interface InfoFields {
  name?: string | null,
  address1?: string | null,
  address2?: string | null,
  contactName?: string | null,
  contactNumber?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
}

export interface InstructionLookup{

}


export interface ReferenceNumbers{
  id?: string | null,
  value?: string | null,
  pieces?: string | null,
  weight?: string | null,
  relatedValue?: string | null
}

export interface Accessorial{
  code?: string | null,
  description?: string | null
}

export interface EntryData {
  proNumber?: string | null,
  type?: string | null,
  masterProNumber?: string | null,
  osd?: string | null,
  terms?: string | null | number,

  billClerk?: string | null,
  il?: string | null,
  date?: string | null,
  pickupDate?: string | null,
  term?: string | null,
  weight?: string | null | number,
  ilPro?: string | null,
  bills?: string | null | number,
  puTrailer?: string | null,
  orig?: string | null,
  dest?: string | null,
  shc?: string | null,
  plt?: string | null | number,
  lpsc?: string | null,
  tpcs?: string | null | number,
  
  referenceNumbers?: ReferenceNumbers[],
  accOrIns? :Accessorial[],

  specialInstructions?: string[],
  items?: Items[],

  consignee?: InfoFields,
  billTo?: InfoFields,
  shipper?: InfoFields

  // Index signature allows for additional dynamic properties
  // Dynamic structure: parent properties are dynamic objects containing child properties
  // Dynamic properties
  // Dynamic properties
  [parentProperty: string]:
  | {
    [childProperty: string]: Record<string, any> | InfoFields | ReferenceNumbers | Accessorial  | string | Items[] | string[];
  }
  | string
  | InfoFields
  | Items[]
  | string[]
  | ReferenceNumbers[]
  | Accessorial
  | number
  | null  // Allow null for dynamic properties as well
  | undefined;  // Allow undefined for dynamic properties

}