
import { createSlice } from "@reduxjs/toolkit";

const data: any = {
    rejectModal : false
}

const modalData = createSlice({
    name: "modalData",
    initialState: data,
    reducers: {
      changeModalData: (state, action) => {
        const {  property } = action.payload;
 
        let prevState = state[property];
      
        state[property] = !prevState
      
      },

    
        clearState: () => data,
    },
});

export const { changeModalData,clearState} =
modalData.actions;
export default modalData.reducer;