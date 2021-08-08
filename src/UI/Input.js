import React from 'react';
import styles from './Input.module.scss';
const Input = (props) =>{
    return(
        <div className={`${styles.container} ${props.className}`}>
            <label htmlFor={props.input.id}>{props.input.label}</label>
            <input {...props.input}/>
        </div>
    )
}

export default Input;