
import { EntryData, InfoFields, Items } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
const data: any = {
 
}

const imageData = createSlice({
    name: "request",
    initialState: data,
    reducers: {
      changeImageData: (state, action) => {
        const {  newValue } = action.payload;
  
        return newValue;
      },

    
        requestClearState: () => data,
    },
});

export const {  changeImageData} =
imageData.actions;
export default imageData.reducer;