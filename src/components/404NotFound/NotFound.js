import React from "react";
import Wave from "../Navigation/Wave";
import styles from "./NotFound.module.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <Wave />
      </div>
      <div className={styles.error}>
        <div className={styles["text-error"]}>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>

        <div className={styles.content}>
          <p>Trang bạn tìm hiện không tồn tại</p>
          <Link to='/'>
            <Button variant="contained" className={styles.btn}>
              Quay về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
