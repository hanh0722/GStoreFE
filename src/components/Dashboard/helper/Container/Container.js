import React from 'react';
import styles from '../../Analytics/Analytics.module.scss';

const Container = (props) =>{
    return(
        <div className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Container
