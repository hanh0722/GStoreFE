import React, { useState, useRef, useCallback } from "react";
import Layout from "../Layout/Layout";
import Container from "../helper/Container/Container";
import { Button, TextField } from "@material-ui/core";
import styles from "./FormPost.module.scss";
import useInput from "../../hook/use-input";
import Files from "./Files";
import useHttp from "../../hook/use-http";
import { CSSTransition } from "react-transition-group";
import Inform from "../ChangingPost/UI/Inform/Inform";
import ReactDOM from "react-dom";
import OverlayPortals from "../../Overlay/OverlayPortal";
import Loading from '../../../UI/Loading/Loading';
import { Link } from "react-router-dom";
import {DASHBOARD_LINK, BlogLink} from '../../link/link';
const FormPost = () => {
  const [isValidImages, setIsValidImages] = useState(true);
  const [statusUploading, setStatusUploading] = useState(null);
  const [arrayOfImages, setArrayOfImages] = useState(null);
  const contentRef = useRef('');
  const contentNextRef = useRef('');
  const contentThirdRef = useRef('');
  const {
    isValid,
    isTouched,
    inputIsTouchedHandler,
    changeInputHandler,
    valueInput,
  } = useInput((value) => value.trim().length > 0);
  const {
    fetchingDataHandler,
    data,
    status,
    error,
    resetState
  } = useHttp();
  const gettingFilesHandler = useCallback((files) => {
    setArrayOfImages(files);
  }, []);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!arrayOfImages || arrayOfImages.length < 3) {
      setIsValidImages(false);
      return;
    }
    setStatusUploading('pending');
    const formData = new FormData();
    arrayOfImages.forEach((items) => {
      formData.append("photos", items);
    });
    try {
      const response = await fetch("http://localhost:3001/api/upload-images", {
        method: "POST",
        body: formData,
      });
      if(!response.ok){
        throw new Error('error');
      }
      const dataImages = await response.json();
      const arrayImages = [];
      dataImages.forEach(items =>{
        arrayImages.push(items.filename);
      })
      fetchingDataHandler({
        url: 'http://localhost:3001/api/create-post',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: {
          title: valueInput,
          content1: contentRef.current.value,
          content2: contentNextRef.current.value,
          content3: contentThirdRef.current.value,
          image1: arrayImages[0],
          image2: arrayImages[1],
          image3: arrayImages[2],
          dateblog: new Date().toISOString(),
          showed: true
        }
      })
    } catch (err) {
      setStatusUploading('error');
    }
    setStatusUploading('completed');
  };
  const resetStateHandler = () =>{
    setStatusUploading(null);
    setIsValidImages(true);
    resetState();
  }
  return (
    <>
    {(statusUploading === 'pending' || status === 'pending') && <Loading className={styles.loading}/>}
    <Layout title="Tạo Blog">
      <Container className={styles.container}>
        <form onSubmit={submitHandler} className={styles.form}>
          <label htmlFor="title">Tiêu đề bài viết</label>
          <TextField
            id="title"
            margin="normal"
            required={true}
            label="Tiêu đề"
            variant="outlined"
            multiline
            placeholder="Tiêu Đề"
            size="medium"
            fullWidth={true}
            value={valueInput}
            onChange={changeInputHandler}
            onBlur={inputIsTouchedHandler}
            error={!isValid && isTouched}
          />
          {!isValid && isTouched && (
            <p className={styles.invalid}>Tiêu đề không được để trống</p>
          )}
          <label htmlFor="body-1">Đoạn 1</label>
          <TextField
            id="body-1"
            margin="normal"
            label="Đoạn 1"
            variant="outlined"
            multiline
            placeholder="Nội Dung 1"
            size="medium"
            fullWidth={true}
            inputRef={contentRef}
          />
          <label htmlFor="body-2">Đoạn 2</label>
          <TextField
            id="body-2"
            margin="normal"
            label="Đoạn 2"
            variant="outlined"
            multiline
            placeholder="Nội Dung 2"
            size="medium"
            fullWidth={true}
            inputRef={contentNextRef}
          />
          <label htmlFor="body-3">Đoạn 3</label>
          <TextField
            id="body-3"
            margin="normal"
            label="Đoạn 3"
            variant="outlined"
            multiline
            placeholder="Nội Dung 3"
            size="medium"
            fullWidth={true}
            inputRef={contentThirdRef}
          />
          <Files gettingFiles={gettingFilesHandler} />
          <Button type="submit" className={styles.btn} variant="contained">
            Đăng bài!
          </Button>
        </form>
        <CSSTransition
          in={statusUploading === 'error' || !isValidImages || (data && status === 'completed') || (error && status === 'error')}
          mountOnEnter
          unmountOnExit
          classNames="fade-light"
          timeout={500}
        >
          <>
            <Inform>
              {!isValidImages && <p>Upload tối thiểu 3 ảnh!</p>}
              {error && status === 'error'  && <p>Có lỗi xảy ra, xin thử lại sau</p>}
              {data && status === 'completed' && statusUploading === 'completed' && 
              <div className={styles.success}>
                <p>Tải bài viết lên thành công</p>
                <div className={styles.information}>
                  <p>Thông tin bài viết</p>
                  <ul>
                    <li>Tiêu đề: <span>{data.title}</span></li>
                    <li>Nội dung 1: <span>{data.content1}</span></li>
                    <li>Nội dung 2: <span>{data.content2}</span></li>
                    <li>Nội dung 3: <span>{data.content3}</span></li>
                  </ul>
                </div>
                <div className={styles['line-btn']}>
                  <Link to={DASHBOARD_LINK.BLOG}><Button variant='contained'>Về quản lý tin tức</Button></Link>
                  <Link to={BlogLink}><Button variant='contained'>Về tin tức</Button></Link>
                </div>
              </div>
              }
              <div
                onClick={resetStateHandler}
                className={styles["btn-close"]}
              >
                <div></div>
                <div></div>
              </div>
            </Inform>
            {ReactDOM.createPortal(
              <OverlayPortals layout={resetStateHandler}/>,
              document.getElementById("overlay")
            )}
          </>
        </CSSTransition>
      </Container>
    </Layout>
    </>
  );
};

export default FormPost;
