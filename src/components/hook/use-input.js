import {useReducer} from 'react';

const initialState = {
    isTouched: false,
    valueInput: ''
}
const inputReducer = (state, action) =>{
    switch(action.type){
        case 'BLUR':
            return{
                ...state,
                isTouched: true
            }
        case 'INPUT':
            return{
                ...state,
                valueInput: action.payload
            }
        case 'RESET':
            return{
                isTouched: false,
                valueInput: ''
            }
        default:
            return state;
    }
}
const useInput = (validateInput) =>{
    const [state, dispatch] = useReducer(inputReducer, initialState);
    const isValid = validateInput(state.valueInput);
    const inputIsTouchedHandler = () =>{
        dispatch({
            type: 'BLUR'
        })
    }
    const changeInputHandler = (event) =>{
        dispatch({
            type: 'INPUT',
            payload: event.target.value
        })
    }

    const resetInputHandler = () =>{
        dispatch({
            type: 'RESET'
        })
    }
    return {
        isTouched: state.isTouched,
        isValid: isValid,
        valueInput: state.valueInput,
        inputIsTouchedHandler: inputIsTouchedHandler,
        changeInputHandler: changeInputHandler,
        resetInputHandler: resetInputHandler
    }
}

export default useInput;