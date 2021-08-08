import React from "react";
import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./Submit.module.scss";
import { Button } from "@material-ui/core";
const Submit = () => {
  return (
    <>
      <div className={styles.row}>
        <p>Hiện bài viết</p>
        <ToggleButton />
      </div>
      <Button type='submit' className={styles.btn} variant="contained">
        Đăng bài
      </Button>
    </>
  );
};

export default Submit;
