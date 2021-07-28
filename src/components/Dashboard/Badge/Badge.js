import React from 'react';
import styles from './Badge.module.scss';
const Badge = ({isLocked}) =>{
    return(
        <div className={`${styles.badge} ${isLocked && styles.locked}`}>
            <span>{isLocked ? 'Bị Khóa' : 'Bình Thường'}</span>
        </div>
    )
}

export default React.memo(Badge);