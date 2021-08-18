import React from 'react';
import styles from '../scss/NewestPost.module.scss';
const PaginationBlog = ({numberOfPagination, changeThePage, currentPage}) =>{
    return(
        numberOfPagination().map(items =>{
            return <li className={currentPage === items ? styles['active-btn']: ''} onClick={changeThePage} key={items}>{items}</li>
        })
    )
}

export default PaginationBlog;