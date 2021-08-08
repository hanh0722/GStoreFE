import React from 'react';
import styles from './ToggleButton.module.scss';
const ToggleButton = ({isClicked, changeStatusHandler}) =>{
    return(
        <div onClick={changeStatusHandler} className={`${styles.btn} ${isClicked && styles.back}`}></div>
    )
}

export default ToggleButton;