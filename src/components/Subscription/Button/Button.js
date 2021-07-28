import React from 'react';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const Button = ({onPlay}) =>{
    return(
        <div onClick={onPlay} className={styles.button}>
            <FontAwesomeIcon icon={faPlay}/>
            <span className={styles.ripple}></span>
        </div>
    )
}

export default Button;