import React from 'react';
import styles from './Centered.module.scss';
const Centered = (props) =>{
    return(
        <div className={styles.centered}>{props.children}</div>
    )
}

export default Centered;