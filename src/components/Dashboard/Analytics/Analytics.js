import React from 'react';
import ChartUsers from './Chart';
import Container from '../helper/Container/Container';
const Analytics = () =>{
    return(
        <Container>
            <h3>Số lượng người truy cập</h3>
            <ChartUsers/>
        </Container>
    )
}
export default Analytics;