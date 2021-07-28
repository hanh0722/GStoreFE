import React from "react";
import Layout from "../Layout/Layout";
import FieldSet from "./UI/FieldSet";
import { Col, Row } from "react-bootstrap";
import Submit from "./UI/Submit/Submit";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import useHttp from "../../hook/use-http";
import Loading from "../../../UI/Loading/Loading";
import styles from './ChangingPost.module.scss';
const ChangingPost = () => {
    const {fetchingDataHandler: uploadImagesHandler, data: dataImages, status: statusImages} = useHttp();
    const {fetchingDataHandler: uploadData, data: getDataHandler, status: statusUpload} = useHttp();
    const information = useSelector(state => state.post.information);
    console.log(information);
    let uploadImages = null;
    const getData = (data) =>{
        uploadImages = data;
        console.log(uploadImages);
    }
    const submitHandler = event =>{
        event.preventDefault();
        if(uploadImages === null){
          
        }
    }
  return (
    <>
    {statusUpload === 'pending' && <Loading className={styles.loading}/>}
    <Layout title="Chỉnh Sửa Bài Viết">
      <form onSubmit={submitHandler}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={8}>
            <Container>
              <FieldSet getData={getData}/>
            </Container>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4}>
            <Container>
              <Submit />
            </Container>
          </Col>
        </Row>
      </form>
    </Layout>
    </>
  );
};

export default ChangingPost;
