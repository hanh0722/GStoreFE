import React from 'react';
import styles from './Overlay.module.scss';
const Overlay = ({layout}) =>{
    return(
        <div onClick={layout} className={styles.overlay}></div>
    )
}

export default Overlay;