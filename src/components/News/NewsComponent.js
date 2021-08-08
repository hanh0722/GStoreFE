import React from "react";
import styles from "./NewsComponent.module.scss";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsComponent = ({ url, date, title, content, path }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={url} alt="" />
      </div>
      <div className={styles.content}>
        <p>{date}</p>
        <p>{title}</p>
        <p>{content}</p>
      </div>
      <div className={styles.button}>
        <Button variant="contained" color="primary">
          <Link to={path}>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>Xem Thêm</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NewsComponent;
