import React from 'react';
import styles from './Card.module.scss'
const Card = (props) =>{
    return(
        <div className={props.className}>
            <div className={styles.icon}>{props.children}</div>
        </div>
    )
}

export default Card;