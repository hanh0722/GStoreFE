import React from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { useSelector } from 'react-redux';
import ProfileAdmin from '../Dashboard/ProfileAdmin/ProfileAdmin';
const MainDashBoard = () =>{
    const profileAdmin = useSelector(state => state.signin.information);
    return(
        <Layout title='Bảng Điều Khiển'>
            <ProfileAdmin admin={profileAdmin}/>
        </Layout>
    )
}

export default MainDashBoard;