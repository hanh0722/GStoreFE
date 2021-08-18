import React from "react";
import styles from "./TopButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const TopButton = () => {
    const isShowed = useSelector(state => state.btn.isShowed);
    const onTopHandler = () =>{
      window.scrollTo(0,0);
    }
  return (
      <div onClick={onTopHandler} className={`${styles.btn} ${isShowed && styles['btn-show']}`}>
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
  );
};

export default TopButton;
