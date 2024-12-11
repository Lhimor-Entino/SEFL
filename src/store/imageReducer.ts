
import { createSlice } from "@reduxjs/toolkit";

const data: any = {
 
}

const imageData = createSlice({
    name: "imageData",
    initialState: data,
    reducers: {
      changeImageData: (_state, action) => {
        const {  newValue } = action.payload;
  
        return newValue;
      },

    
        clearState: () => data,
    },
});

export const {  changeImageData,clearState} =
imageData.actions;
export default imageData.reducer;