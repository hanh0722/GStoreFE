import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: 'pending',
    newPassword: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadingFetching(state){
            state.status = 'pending'
        },
        getInformation(state, action){
            state.user = action.payload;
            state.status = 'success';
        },
        changeNameHandler(state, action){
            state.user.name = action.payload
        },
        lockAccount(state){
            state.user.islocked = !state.user.islocked;
        },
        newPasswordHandler(state, action){
            state.newPassword = action.payload
        },
        errorFetching(state){
            state.status = 'error';
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;
