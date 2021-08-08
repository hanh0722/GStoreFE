import React from "react";
import styles from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
