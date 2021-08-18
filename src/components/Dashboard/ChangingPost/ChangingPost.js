import React, { useState } from "react";
import Layout from "../Layout/Layout";
import FieldSet from "./UI/FieldSet";
import { Col, Row } from "react-bootstrap";
import Submit from "./UI/Submit/Submit";
import Container from "../container/Container";
import Loading from "../../../UI/Loading/Loading";
import styles from "./ChangingPost.module.scss";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Inform from "./UI/Inform/Inform";
import "../../../transitionGroup/CSSTransitionGroup.scss";
import BasicInfo from "./UI/BasicInfo/BasicInfo";
import ReactDOM from 'react-dom';
import OverlayPortals from '../../Overlay/OverlayPortal';
const ChangingPost = () => {
  const [newImagesUploading, setNewImagesUploading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [enoughImages, setEnoughImages] = useState(true);
  const information = useSelector((state) => state.post.information);
  const [isValid, setIsValid] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (newImagesUploading.length !== 0) {
      // temporary we can't fix this first!
      if (newImagesUploading.length < 3) {
        setEnoughImages(false);
        return;
      }
      const formData = new FormData();
      newImagesUploading.forEach((items) => {
        formData.append("photos", items);
      });
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/images/${information.id}`,
          {
            method: "POST",
            body: formData,
            // headers: {'Content-Type': 'multipart/form-data'}
          }
        );
        if (!response.ok) {
          throw new Error("error");
        }
        const dataItems = await response.json();
        if (!dataItems.id) {
          throw new Error("not valid");
        }
      } catch (err) {
        setError(true);
        setLoading(false);
        return;
      }
    }
    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: information.title,
          image1: information.image1,
          image2: information.image2,
          image3: information.image3,
          content1: information.content1,
          content2: information.content2,
          content3: information.content3,
          id: information.id,
          removeImages: newImagesUploading.length === 0 ? false : true,
        }),
      });
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      if (!data.id) {
        throw new Error("not valid!");
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
    setError(false);
    setIsValid(true);
  };
  const setNewImages = (items) => {
    setNewImagesUploading(items);
  };
  const resetState = () =>{
    setError(false);
    setEnoughImages(true);
    setIsValid(false);
  }
  return (
    <>
      {loading && <Loading className={styles.loading} />}
      <Layout title="Chỉnh Sửa Bài Viết">
        <form onSubmit={submitHandler}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8}>
              <Container>
                <FieldSet setNewImages={setNewImages} />
              </Container>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4}>
              <Container className={styles.submit}>
                <Submit />
              </Container>
            </Col>
          </Row>
          <CSSTransition
            in={(error && !loading) || !enoughImages || (isValid && !loading && !error)}
            timeout={500}
            classNames="fade-light"
            unmountOnExit
            mountOnEnter
          >
            
            <Inform>
              {error && !loading && <p>Hãy điền đầy đủ thông tin trước khi đăng bài!, ảnh không được phép trùng nhau!</p>}
              {!enoughImages && <p>Hãy upload đủ 3 ảnh!</p>}
              {isValid && !loading && !error && <BasicInfo/>}
              <div onClick={resetState} className={styles['close-modal']}>
                <div onClick={resetState}></div>
                <div onClick={resetState}></div>
              </div>
              {ReactDOM.createPortal(<OverlayPortals layout={resetState}/>, document.getElementById('overlay'))}
            </Inform>
          </CSSTransition>
        </form>
      </Layout>
    </>
  );
};

export default ChangingPost;
