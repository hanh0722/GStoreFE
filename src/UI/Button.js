import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
  return (
    <a href={props.link}>
      <button className={`${styles.button} ${props.className}`}>
        {props.children}
      </button>
    </a>
  );
};

export default Button;
