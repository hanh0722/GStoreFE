import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./ProfileAdmin.module.scss";
import { Row, Col } from "react-bootstrap";
import Analytics from "../Analytics/Analytics";
import AnalyticsPost from "../AnalyticsPosts/AnalyticsPost";
import DonutChart from "../AnalystAdmin/AnalystAdmin";
import Container from "../helper/Container/Container";
import {DASHBOARD_LINK} from '../../link/link';
const ProfileAdmin = (props) => {
  return (
    <div className={styles.box}>
      <Row>
        <Col className={styles.col} xs={12} sm={12} md={6} lg={6}>
          <div className={styles.images}>
            <p>
              Welcome back, <span>{props.admin.name}</span>
            </p>
            <div className={styles.btn}>
            <Link to={DASHBOARD_LINK.BLOG}>
              <Button variant='contained'>Blogs</Button>
            </Link>
            </div>
            <Link to={DASHBOARD_LINK.CREATE_BLOG}>
              <Button className={styles['btn-2']} variant='contained'>Tạo Blog</Button>
            </Link>
          </div>
          <AnalyticsPost/>
        </Col>
        <Col className={styles.row} xs={12} sm={12} md={6} lg={6}>
          <Analytics/>
        </Col>
      </Row>
      <Row>
        <Col className={`${styles.chart} ${styles.row}`} xs={12} sm={12} md={6} lg={6}>
          <DonutChart/>
        </Col>
        <Col className={`${styles.row} ${styles['row__up']}`} xs={12} sm={12} md={6} lg={6}>
          <Container>
            <h3>Thông tin admin</h3>
            <ul className={styles['infor-admin']}>
              <li>Tên admin: {props.admin.name}</li>
              <li>Email: {props.admin.username}</li>
              <li>Bị khóa: {props.admin.islocked ? 'Bị khóa' : 'Hoạt động'}</li>
            </ul>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileAdmin;
