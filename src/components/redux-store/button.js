import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShowed: false
}
const buttonSlice = createSlice({
    name: 'button',
    initialState: initialState,
    reducers: {
        showUpHandler(state){
            state.isShowed = true
        },
        removeHandler(state){
            state.isShowed = false;
        }
    }
})

export const buttonActions = buttonSlice.actions;

export default buttonSlice;
