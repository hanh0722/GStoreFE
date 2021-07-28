import React from "react";
import styles from "./Loading.module.scss";
const Loading = (props) => {
  return (
    <div className={props.className}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.children}
    </div>
  );
};

export default Loading;
