import React, { useEffect } from 'react';
import Layout from '../Dashboard/Layout/Layout';
import { adminInformation } from '../redux-store/Store';
import { useDispatch } from 'react-redux';
const MainDashBoard = () =>{
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(adminInformation());
    }, [dispatch])
    return(
        <Layout>
            
        </Layout>
    )
}

export default MainDashBoard;