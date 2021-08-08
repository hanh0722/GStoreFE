import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SearchBox from '../SearchBox/SearchBox';
import WrapperBlog from '../../layout/WrapperBlog/WrapperBlog';
import LayoutPost from '../LayoutPost/LayoutPost';
const SearchingPost = ({data}) =>{
    console.log(data);
    return(
        <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
                {data.map(items =>{
                    return <LayoutPost/>
                })}
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
                <WrapperBlog>
                    <SearchBox/>
                </WrapperBlog>
            </Col>
        </Row>
    )
}

export default SearchingPost;