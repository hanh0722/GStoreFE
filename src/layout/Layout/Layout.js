import React from 'react';
import styles from './Layout.module.scss';
const Layout = (props) =>{
    return(
        <div className={`${styles.layout} ${props.className}`} id={props.id ? props.id : ''} data-aos={props.aos}>{props.children}</div>
    )
}

export default Layout;