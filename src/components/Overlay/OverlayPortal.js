import React from 'react';
import styles from './OverlayPortals.module.scss';
const OverlayPortals = ({layout}) =>{
    return(
        <div onClick={layout} className={styles.overlay}></div>
    )
}

export default OverlayPortals;