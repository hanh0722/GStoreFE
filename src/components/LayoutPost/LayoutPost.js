import React from "react";
import styles from "./LayoutPost.module.scss";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const LayoutPost = (props) => {
  return (
    <Row className={styles.container}>
      <Col xs={12} sm={6} md={4} lg={4} className={styles.images}>
        <img
          src={require("../../img/images/blog-1.jpeg").default}
          alt="Item1"
        />
      </Col>
      <Col xs={12} sm={6} md={8} lg={8} className={styles.content}>
        <p className={styles.link}>
          <Link to={`/tin-tuc/123?id=1`}>{props.title}</Link>
        </p>
        <p className={styles.line}>{props.content}</p>
        <Link to={`/tin-tuc/123?id=1`}>
          <Button variant="contained" className={styles.btn}>
            <FontAwesomeIcon icon={faArrowRight} /> Xem Thêm
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default LayoutPost;
