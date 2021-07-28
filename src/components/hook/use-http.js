import { useReducer, useCallback } from "react";

const initialState = {
    data: null,
    status: '',
    error: null
}

const httpReducer = (state, action) =>{
    switch(action.type){
        case 'PENDING':
            return {
                ...state,
                status: 'pending'
            }
        case 'COMPLETED':
            return {
                ...state,
                status: 'completed',
                data: action.payload
            }
        case 'ERROR':
            return{
                ...state,
                status: 'error',
                error: action.payload
            }
        case 'RESET_ERROR':
            return {
                ...state,
                error: null
            }
        default:
            return initialState;
    }
}
const useHttp = () =>{
    const [state, dispatch] = useReducer(httpReducer, initialState);
    
    const fetchingDataHandler = useCallback(async (getResponse) =>{
        dispatch({
            type: 'PENDING'
        })
        try{
            const response = await fetch(getResponse.url, {
                method: getResponse.method ? getResponse.method : 'GET',
                body: getResponse.body ? JSON.stringify(getResponse.body) : null,
                headers : getResponse.headers ? getResponse.headers : {}
            });
            if(!response.ok){
                throw new Error('something happened!');
            }
            const dataFetching = await response.json();
            dispatch({
                type: 'COMPLETED',
                payload: dataFetching
            })
        }catch(err){
            dispatch({
                type: 'ERROR',
                payload: err.message
            })
        }
    }, [])
    const setAgainHandler = useCallback(() =>{
        dispatch({
            type: 'RESET_ERROR'
        })
    }, []);
    return {
        ...state,
        fetchingDataHandler,
        setAgainHandler
    }
}

export default useHttp;