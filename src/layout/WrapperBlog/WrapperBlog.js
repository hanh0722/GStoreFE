import React from 'react';
import styles from '../../components/BlogComponent/BlogComponent.module.scss';
const WrapperBlog = (props) =>{
    return(
        <div className={`${styles['search-field']} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default WrapperBlog;