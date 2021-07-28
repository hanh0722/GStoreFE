import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import styles from './ButtoSideBar.module.scss';
const ButtonSideBar = ({isClicked, clickHandler}) =>{
    return(
        <div onClick={clickHandler} className={`${styles.button} ${isClicked && styles['button-none']}`}>
            <FontAwesomeIcon icon={faSlidersH}/>
        </div>
    )
}

export default ButtonSideBar;