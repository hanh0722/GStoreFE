import React from 'react';
import styles from '../FieldSet.module.scss';
import { TextField } from '@material-ui/core';

const TextArea = (props) =>{
    return(
        <div className={`${styles.row} ${props.className}`}>
            <TextField {...props.textField}/>
        </div>
    )
}

export default TextArea;