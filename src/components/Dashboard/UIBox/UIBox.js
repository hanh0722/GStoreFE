import React from 'react';
import styles from './UIBox.module.scss';
const UIBox = (props) =>{
    return(
        <div className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default UIBox;