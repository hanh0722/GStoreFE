import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBox.module.scss';
const SearchBox = (props) =>{
    return(
        <div className={props.className}>
            <label htmlFor='search'>Tìm kiếm</label>
            <div className={styles.box}>
            <input id='search' type='text' placeholder='Tìm kiếm...'/>
            <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
    )
}

export default SearchBox;