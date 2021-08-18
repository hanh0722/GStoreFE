import React from "react";
import { Link } from "react-router-dom";
import styles from "./Wrapper.module.scss";
const Wrapper = (props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>{props.title}</h1>
        {props.path && <Link to={props.path}>{props.link}</Link>}
        {props.content && <p>{props.content}</p>}
      </div>
      {props.children}
    </>
  );
};

export default Wrapper;
