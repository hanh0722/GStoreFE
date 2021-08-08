import React from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./System.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card/Card";
import Container from "./Card/Container";
import { Row, Col } from "react-bootstrap";
import p1 from '../../img/images/phone_white-02.png';
import { SystemData } from "./SystemData";

const System = () => {
  const renderLeft = SystemData.map((items, index) =>{
    if(index % 2 === 0){
      return <Container key={index} className={`${styles.content} ${styles.right}`}>
        <Card className={styles['right-icons']}>
          <FontAwesomeIcon icon={items.icon}/>
        </Card>
        <p className={styles['title-text']}>{items.title}</p>
        <p>{items.content}</p>
      </Container>
    }
    return ''
  })
  const renderRight = SystemData.map((items, index) =>{
    if(index % 2 !== 0){
      return <Container key={index} className={styles.content}>
      <Card className={styles['right-side']}>
        <FontAwesomeIcon icon={items.icon}/>
      </Card>
      <p className={styles['title-text']}>{items.title}</p>
      <p>{items.content}</p>
    </Container>
    }
    return ''
  })
  return (
    <Layout className={styles.container} aos='fade-up' id='features'>
      <h2>Tính năng định vị & Phân loại vượt trội</h2>
      <p className={styles.title}>
        G-STORE là ứng dụng tuyệt vời để tìm kiếm và kết nối giao thương dựa
        trên nhu cầu thực tiễn của người mua và người bán
      </p>
      <Row className={styles.row}>
        <Col xs={12} sm={12} md={4} lg={4} className={styles.column}>
          {renderLeft}
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className={styles.img}>
          <img src={p1} alt=''/>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} className={styles.column}>
          {renderRight}
        </Col>
      </Row>
    </Layout>
  );
};

export default System;
