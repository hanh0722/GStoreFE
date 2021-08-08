import React from "react";
import styles from "./Notification.module.scss";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Notification = () => {
  return (
    <>
      <div className={styles.notify}>
        <div className={`${styles.box}`}>
          <div className={styles.checked}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <p className={styles.text}>Thay đổi thành công</p>
          <Button variant="contained" className={styles.btn}>
            <Link to='/admin/dashboard/user'>Về lại trang chính</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Notification;
