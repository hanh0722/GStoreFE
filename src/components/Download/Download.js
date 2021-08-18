import React, { useState } from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./Download.module.scss";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";
import p1 from "../../img/images/Application.png";
import DownloadNotification from "./DownloadNotification";
import { useDispatch } from "react-redux";
import { layoutActions } from "../redux-store/Store";
const Download = () => {
  const [btn, setBtn] = useState("");
  const dispatch = useDispatch();
  const buttonHandler = (data) => {
    dispatch(layoutActions.toggleDownload());
    setBtn(data);
  };
  return (
    <div id="download" className={styles.container}>
      <Layout>
        <Row className={styles.row} data-aos="fade-up">
          <Col xs={12} sm={12} md={6} lg={6} className={styles["left-side"]}>
            <h2>Trải nghiệm ngay ứng dụng G-STORE</h2>
            <p>Tải ứng dụng và tham gia mua - bán với cộng đồng G-STORE ngay</p>
            <div className={styles.button}>
              <Button
                tabIndex="0"
                onClick={() => buttonHandler(0)}
                variant="contained"
                className={`${styles.btn} ${styles["apple-btn"]}`}
              >
                <FontAwesomeIcon icon={faApple} />
                <span>Tải trên Appstore</span>
              </Button>
              <Button
                onClick={() => buttonHandler(1)}
                tabIndex="1"
                variant="contained"
                className={`${styles.btn} ${styles["andr-btn"]}`}
              >
                <FontAwesomeIcon icon={faAndroid} />
                <span>Tải trên CHPlay</span>
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5} className={styles["right-side"]}>
            <img src={p1} alt="" />
          </Col>
        </Row>
      </Layout>
      <DownloadNotification data={btn} />
    </div>
  );
};

export default Download;
