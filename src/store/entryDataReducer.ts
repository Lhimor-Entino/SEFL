
import { Accessorial, EntryData, Items, ReferenceNumbers } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
const data: EntryData = {}


const entryData = createSlice({
  name: "entryData",
  initialState: data,
  reducers: {
    changeRequestData: (_state, action) => {
      const { newValue } = action.payload;

      return newValue;
    },
    changeBillingInfo: (state, action) => {
      const { property, newValue } = action.payload;
      state[property] = newValue;
    },
    changeBillingAccountInfoData: (state, action) => {
      const { parent_property, child_property, newValue } = action.payload;

      if (state[parent_property] === null) {

        if (!state[parent_property]) {
          const data_ = {
            name: "",
            address1: "",
            address2: "",
            contactName: "",
            contactNumber: "",
            city: "",
            state: "",
            zip: ""
          }


          state[parent_property] = data_

        }

      }
      (state[parent_property] as WritableDraft<Record<string, any>>)[child_property] = newValue;

    },
    changeItemData: (state, action: PayloadAction<{
      itemIndex: number;
      property: keyof Items; // Ensure the property is a key of Items
      newValue: any;
    }>) => {
      const { property, itemIndex, newValue } = action.payload;
      if (!state.items) return
      if (state.items[itemIndex]) {

        (state.items[itemIndex] as WritableDraft<Items>)[property] = newValue;
      }
    },
    setItemData: (state, action: PayloadAction<{
      index: number;
      newValue: Items;
    }>) => {
      const { index, newValue } = action.payload;
      if (!state.items) return
      if (state.items[index]) {

        (state.items[index] as WritableDraft<Items>) = newValue;
      }

    },
    addItems: (state) => {
      const data_: Items = {
        charge: "",
        pieces: "",
        hm: "",
        ref: "",
        description: "",
        weight: "",
        sqYds: "",
        class: ""
      }

      if (!state.items) {
        state.items = [data_]
      } else {
        state.items.push(data_);
      }

    },
    addInstruction: (state, action) => {

      const { newValue } = action.payload;



      if (state.specialInstructions !== null) {
        if (!state.specialInstructions) return
        state.specialInstructions.push(newValue);


      } else {
        state.specialInstructions = [newValue]
      }


    },
    updateInstruction: (state, action) => {

      const { newValue } = action.payload;

      state.specialInstructions = newValue
    },

    changeReferenceData: (state, action: PayloadAction<{
      index: number;
      property: keyof ReferenceNumbers; // Ensure the property is a key of Items
      newValue: any;
    }>) => {
      const { property, index, newValue } = action.payload;
      if (!state.referenceNumbers) return
      if (state.referenceNumbers[index]) {
        console.log(state.referenceNumbers[index][property])
        state.referenceNumbers[index][property] = newValue;

        (state.referenceNumbers[index] as WritableDraft<ReferenceNumbers>)[property] = newValue;
        console.log(action.payload)
      }

    },
    addReference: (state) => {
      const data_: ReferenceNumbers = {
        id: null,
        value: null,
        pieces: null,
        weight: null,
        relatedValue: null,

      }

      if (!state.referenceNumbers) {
        state.referenceNumbers = [data_]
      } else {
        state.referenceNumbers.push(data_);
      }
    },

    changeAccessorialData: (state, action: PayloadAction<{
      index: number;
      property: keyof Accessorial; // Ensure the property is a key of Items
      newValue: any;
    }>) => {
      const { property, index, newValue } = action.payload;
      if (!state.accOrIns) return
      if (state.accOrIns[index]) {
        console.log(state.accOrIns[index][property])
        state.accOrIns[index][property] = newValue;

        (state.accOrIns[index] as WritableDraft<Accessorial>)[property] = newValue;
        console.log(action.payload)
      }
    },
    addAccessorial: (state) => {
      const data_: Accessorial = {
        code: null,
        description: null,


      }

      if (!state.accOrIns) {
        state.accOrIns = [data_]
      } else {
        state.accOrIns.push(data_);
      }
    },
    setAccessorialData: (state, action: PayloadAction<{
      index: number;
      newValue: Accessorial;
    }>) => {
      const { index, newValue } = action.payload;
      if (!state.accOrIns) return
      if (state.accOrIns[index]) {

        (state.accOrIns[index] as WritableDraft<Accessorial>) = newValue;
      }

    },
    removeReferenceItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload
      if (!state.referenceNumbers) return

      const filtered = state.referenceNumbers.filter((_f: ReferenceNumbers, index_: number) => index_ != index)
      state.referenceNumbers = filtered

    },
    removeChargeItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload
      if (!state.accOrIns) return

      const filtered = state.accOrIns.filter((_f: Accessorial, index_: number) => index_ != index)
      state.accOrIns = filtered

    },
    removeItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload
      if (!state.items) return

      const filtered = state.items.filter((_f: Items, index_: number) => index_ != index)
      state.items = filtered

    },
    requestClearState: () => data,
  },
});

export const { 
  setItemData,
  removeItem,
  removeChargeItem,
  removeReferenceItem,
  addAccessorial,
  changeAccessorialData,
  setAccessorialData,
  changeReferenceData,
  addReference,
  updateInstruction,
  requestClearState,
  changeRequestData,
  changeBillingAccountInfoData,
  changeBillingInfo,
  changeItemData,
  addItems,
  addInstruction } =
  entryData.actions;
export default entryData.reducer;