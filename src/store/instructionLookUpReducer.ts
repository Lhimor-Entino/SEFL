
import { EntryData, InfoFields, Items } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
const data: any = []

const instructionLookup = createSlice({
    name: "request",
    initialState: data,
    reducers: {
      changeInstructionData: (state, action) => {
        const {  newValue } = action.payload;
  
        return newValue;
      },

    
        requestClearState: () => data,
    },
});

export const { changeInstructionData } =
instructionLookup.actions;
export default instructionLookup.reducer;