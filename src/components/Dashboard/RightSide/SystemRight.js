import React from 'react';
import { Col } from 'react-bootstrap';
const SystemRight = (props) =>{
    return(
        <Col xs={12} sm={12} md={9} lg={9}>
            {props.children}
        </Col>
    )
}

export default SystemRight;