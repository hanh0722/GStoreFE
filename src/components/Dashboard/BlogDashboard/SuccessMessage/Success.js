import React from 'react';
import styles from './Success.module.scss';
const Success = (props) =>{
    return(
        <div className={`${styles.success} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Success;