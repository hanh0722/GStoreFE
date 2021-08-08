import React from "react";
import styles from "./Blog.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useRouteMatch } from "react-router-dom";
const BlogComponent = ({url, link, date, title, id}) => {
    const route = useRouteMatch();
  return (
    <div className={styles.blog}>
      <div className={styles.img}>
        <img src={url} alt=''/>
      </div>
      <div className={styles.link}>
        <p className={styles.date}>
          <FontAwesomeIcon icon={faCalendar}/> {date}
        </p>
        <Link to={`${route.path}/${link}?id=${id}`} className={styles.title}>{title}</Link>
      </div>
    </div>
  );
};

export default BlogComponent;
