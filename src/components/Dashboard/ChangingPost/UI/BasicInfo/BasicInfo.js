import React from 'react';
import styles from './BasicInfor.module.scss';
import { Button } from '@material-ui/core';
import { DASHBOARD_LINK } from '../../../../link/link';
const BasicInfo = () =>{
    return(
        <div className={styles.container}>
            <p>Chỉnh sửa thành công!</p>
            <div className={styles.row}>
                <a href={DASHBOARD_LINK.BLOG}><Button className={styles['btn-1']}>Về trang trước</Button></a>
                <a href={DASHBOARD_LINK.DASHBOARD}><Button className={styles['btn-2']}>Về trang chính</Button></a>
            </div>
        </div>
    )
}

export default BasicInfo;