import React from "react";
import Layout from "../Layout/Layout";
import FieldSet from "./UI/FieldSet";
import { Col, Form, Row } from "react-bootstrap";
import Submit from "./UI/Submit/Submit";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import useHttp from "../../hook/use-http";
import Loading from "../../../UI/Loading/Loading";
import styles from './ChangingPost.module.scss';
const ChangingPost = () => {
    const {fetchingDataHandler: uploadImagesHandler, data: dataImages, status: statusImages, error: errorImages} = useHttp();
    const {fetchingDataHandler: uploadData, data: getDataHandler, status: statusUpload, error: errorUploading} = useHttp();
    const information = useSelector(state => state.post.information);
    let imagesData = null;
    const getData = (data) =>{
      imagesData = data;
    }
    const submitHandler = event =>{
        event.preventDefault();
        if(imagesData){
          const images = imagesData.map(items =>{
            return items;
          })
          const formData = new FormData();
          formData.append('blog-images', images);
          uploadImagesHandler({
            method: 'POST',
            url: 'http://localhost:3001/api/images',
            headers: {'Content-Type': 'multipart/form-data'},
            body: formData
          })
        }
        else{
          uploadData({
            url: 'http://localhost:3001/api/upload',
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: {
              title: information.title,
              image1: information.image1,
              image2: information.image2,
              image3: information.image3,
              content1: information.content1,
              content2: information.content2,
              content3: information.content3,
              id: information.id
            }
          })
          console.log(information);
        }
    }
    console.log(getDataHandler, statusUpload);
  return (
    <>
    {(statusUpload === 'pending' || statusImages === 'pending')  && <Loading className={styles.loading}/>}
    <Layout title="Chỉnh Sửa Bài Viết">
      <form onSubmit={submitHandler} encType='multipart/data'>
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
      {(errorUploading && statusUpload === 'error') && <p>Có lỗi xảy ra, vui lòng thử lại</p>}
    </Layout>
    </>
  );
};

export default ChangingPost;
