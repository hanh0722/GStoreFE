import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBox.module.scss';
import { useHistory } from 'react-router-dom';
const SearchBox = (props) =>{
    const [searchField, setSearchField] = useState('');
    const history = useHistory();
    const submitHandler = event =>{
        event.preventDefault();
        history.push(`/tim-kiem?search=${searchField}`)
    }
    const changeHandler = event =>{
        setSearchField(event.target.value);
    }
    return(
        <form onSubmit={submitHandler} className={props.className}>
            <label htmlFor='search'>Tìm kiếm</label>
                <div className={styles.box}>
                <input onChange={changeHandler} id='search' type='text' placeholder='Tìm kiếm...'/>
                <button type='submit'><FontAwesomeIcon icon={faSearch}/></button>
            </div>
        </form>
    )
}

export default SearchBox;