import React from 'react';
import styles from './SearchField.module.scss';
const SearchField = (props) =>{
    return(
        <div className={`${styles.input} ${props.className}`}>
            {props.children}
            <input {...props.input}/>
        </div>
    )
}

export default SearchField;