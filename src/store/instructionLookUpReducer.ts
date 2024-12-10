

import { createSlice } from "@reduxjs/toolkit";

const data: any = []

const instructionLookup = createSlice({
    name: "request",
    initialState: data,
    reducers: {
      changeInstructionData: (_state, action) => {
        const {  newValue } = action.payload;
  
        return newValue;
      },

    
        requestClearState: () => data,
    },
});

export const { changeInstructionData } =
instructionLookup.actions;
export default instructionLookup.reducer;