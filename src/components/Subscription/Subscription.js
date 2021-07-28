import React, { useRef } from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./Subscription.module.scss";
import { Row, Col } from "react-bootstrap";
import Button from "./Button/Button";
const Subscription = () => {
  const videoRef = useRef();
  const playVideoHandler = () => {
    videoRef.current.src = videoRef.current.src + "?autoplay=1";
  };
  return (
    <div id="introduction" className={styles.container}>
      <div data-aos="fade-up-right">
        <h2>
          Video giới thiệu app <span>G-Store</span>
        </h2>
        <Layout>
          <Row className={styles.row}>
            <Col xs={12} sm={12} md={6} lg={6}>
              <iframe
                ref={videoRef}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2BfQv8HVcIg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
            <Col className={styles["col-button"]} md={6} lg={6}>
              <Button onPlay={playVideoHandler} />
            </Col>
          </Row>
        </Layout>
      </div>
    </div>
  );
};

export default Subscription;
