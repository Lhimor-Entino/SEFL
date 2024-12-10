
import { createSlice } from "@reduxjs/toolkit";

const data: any = {
 
}

const imageData = createSlice({
    name: "request",
    initialState: data,
    reducers: {
      changeImageData: (_state, action) => {
        const {  newValue } = action.payload;
  
        return newValue;
      },

    
        requestClearState: () => data,
    },
});

export const {  changeImageData} =
imageData.actions;
export default imageData.reducer;