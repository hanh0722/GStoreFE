import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBox.module.scss';
import { useHistory } from 'react-router-dom';
const SearchBox = (props) =>{
    const [searchField, setSearchField] = useState('');
    const [isValid, setIsValid] = useState(true);
    const history = useHistory();
    const submitHandler = event =>{
        event.preventDefault();
        if(searchField.trim().length === 0){
            setIsValid(false);
            return;
        }
        history.push(`/tim-kiem?search=${searchField}`)
        setSearchField('');
        setIsValid(true);
    }
    const changeHandler = event =>{
        setSearchField(event.target.value);
    }
    return(
        <form onSubmit={submitHandler} className={props.className}>
            <label htmlFor='search'>Tìm kiếm</label>
                <div className={styles.box}>
                <input value={searchField} onChange={changeHandler} id='search' type='text' placeholder='Tìm kiếm...'/>
                <button type='submit'><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            {!isValid && <p style={{color: 'red'}}>Tìm kiếm không được để trống</p>}
        </form>
    )
}

export default SearchBox;