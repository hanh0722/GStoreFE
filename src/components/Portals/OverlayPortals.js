import React from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay/Overlay';
import { layoutActions } from '../redux-store/Store';
import { useSelector, useDispatch } from 'react-redux';
const OverlayPortals = () =>{
    const isClicked = useSelector(state => state.layout.isClicked);
    const dispatch = useDispatch();
    const clickHandler = () =>{
        dispatch(layoutActions.toggleLayout());
    }
    return(
        <>
            {isClicked && createPortal(<Overlay layout={clickHandler}/>, document.getElementById('overlay'))}
        </>
    )
}

export default OverlayPortals;