import { createSlice } from "@reduxjs/toolkit";

const changePostInitialState = {
    information: null,
    status: 'pending',
}
const changePostSlice = createSlice({
    name: 'change-post',
    initialState: changePostInitialState,
    reducers: {
        updateInformation(state, action){
            state.information = action.payload
        },
        updateImages(state, action){
            console.log(action.payload)
        },
        updateStatus(state, action){
            state.status = action.payload
        },
        updateTitle(state, action){
            state.information.title = action.payload
        },
        updateContent1(state, action){
            state.information.content1 = action.payload
        },
        updateContent2(state, action){
            state.information.content2 = action.payload
        },
        updateContent3(state, action){
            state.information.content3 = action.payload
        }
    }
})

export const fetchingPosts = (id) =>{
    return (dispatch) =>{
        dispatch(changePostActions.updateStatus('pending'));
        fetch(`http://localhost:3001/get-post/${id}`).then(response => response.json())
        .then(data =>{
            dispatch(changePostActions.updateStatus('success'));
            dispatch(changePostActions.updateInformation(data));
        }).catch(err =>{
            dispatch(changePostActions.updateStatus('error'))
        })
    }
}

export const changePostActions = changePostSlice.actions;
export default changePostSlice;