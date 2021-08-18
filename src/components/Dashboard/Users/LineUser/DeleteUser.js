import React from 'react';
import { Button } from '@material-ui/core';
import styles from './DeleteUser.module.scss';

const DeleteUser = ({onRemove, onRemoveUser, dataUser}) =>{
    return(
        <div className={styles.box}>
            <p>Bạn có chắc xóa user <span className={styles.user}>{dataUser ? dataUser.username : ''}</span> không?</p>
            <div className={styles.row}>
                <Button onClick={() => {onRemoveUser(); onRemove()}} variant='contained' className={`${styles['btn-delete']} ${styles.btn}`}>Xóa</Button>
                <Button onClick={onRemove} variant='contained' className={`${styles['btn-cancel']} ${styles.btn}`}>Hủy</Button>
            </div>
        </div>
    )
}

export default DeleteUser;