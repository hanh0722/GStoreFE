import React, {useState} from "react";
import styles from "./Line.module.scss";
const Line = ({ title, content }) => {
    const [isTouched, setIsTouched] = useState(false);
    const onToggle = () =>{
        setIsTouched(prevState => !prevState);
    }
  return (
    <>
      <div onClick={onToggle} className={styles.line}>
        <div className={`${styles.button} ${isTouched && styles.animateButton}`}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.right}>
          <div>{title}</div>
        </div>
      </div>
      <div aria-expanded='true' className={`${styles.content} ${isTouched && styles["content-block"]}`}>
        {content}
      </div>
    </>
  );
};

export default Line;
