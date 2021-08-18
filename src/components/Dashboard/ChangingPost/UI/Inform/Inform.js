import React from 'react';
import styles from './Inform.module.scss';
const Inform = (props) =>{
    return(
        <div className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Inform;