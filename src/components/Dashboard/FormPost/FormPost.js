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
    <Layout title="T???o Blog">
      <Container className={styles.container}>
        <form onSubmit={submitHandler} className={styles.form}>
          <label htmlFor="title">Ti??u ????? b??i vi???t</label>
          <TextField
            id="title"
            margin="normal"
            required={true}
            label="Ti??u ?????"
            variant="outlined"
            multiline
            placeholder="Ti??u ?????"
            size="medium"
            fullWidth={true}
            value={valueInput}
            onChange={changeInputHandler}
            onBlur={inputIsTouchedHandler}
            error={!isValid && isTouched}
          />
          {!isValid && isTouched && (
            <p className={styles.invalid}>Ti??u ????? kh??ng ???????c ????? tr???ng</p>
          )}
          <label htmlFor="body-1">??o???n 1</label>
          <TextField
            id="body-1"
            margin="normal"
            label="??o???n 1"
            variant="outlined"
            multiline
            placeholder="N???i Dung 1"
            size="medium"
            fullWidth={true}
            inputRef={contentRef}
          />
          <label htmlFor="body-2">??o???n 2</label>
          <TextField
            id="body-2"
            margin="normal"
            label="??o???n 2"
            variant="outlined"
            multiline
            placeholder="N???i Dung 2"
            size="medium"
            fullWidth={true}
            inputRef={contentNextRef}
          />
          <label htmlFor="body-3">??o???n 3</label>
          <TextField
            id="body-3"
            margin="normal"
            label="??o???n 3"
            variant="outlined"
            multiline
            placeholder="N???i Dung 3"
            size="medium"
            fullWidth={true}
            inputRef={contentThirdRef}
          />
          <Files gettingFiles={gettingFilesHandler} />
          <Button type="submit" className={styles.btn} variant="contained">
            ????ng b??i!
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
              {!isValidImages && <p>Upload t???i thi???u 3 ???nh!</p>}
              {error && status === 'error'  && <p>C?? l???i x???y ra, xin th??? l???i sau</p>}
              {data && status === 'completed' && statusUploading === 'completed' && 
              <div className={styles.success}>
                <p>T???i b??i vi???t l??n th??nh c??ng</p>
                <div className={styles.information}>
                  <p>Th??ng tin b??i vi???t</p>
                  <ul>
                    <li>Ti??u ?????: <span>{data.title}</span></li>
                    <li>N???i dung 1: <span>{data.content1}</span></li>
                    <li>N???i dung 2: <span>{data.content2}</span></li>
                    <li>N???i dung 3: <span>{data.content3}</span></li>
                  </ul>
                </div>
                <div className={styles['line-btn']}>
                  <Link to={DASHBOARD_LINK.BLOG}><Button variant='contained'>V??? qu???n l?? tin t???c</Button></Link>
                  <Link to={BlogLink}><Button variant='contained'>V??? tin t???c</Button></Link>
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
