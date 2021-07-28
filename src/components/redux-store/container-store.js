import { createSlice } from "@reduxjs/toolkit";

const initialStateContainer = {
    top: ''
}

const containerSlice = createSlice({
    name: 'container',
    initialState: initialStateContainer,
    reducers: {
        setTopHandler(state, action){
            state.top = action.payload;
        }
    }
})

export default containerSlice;