import React from "react";
import styles from "../Users.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Link, useRouteMatch } from "react-router-dom";
const LineUser = ({ username, name, id }) => {
  const route = useRouteMatch();
  return (
    <tr>
      <td>{username}</td>
      <td>{name}</td>
      <td className={styles.row}>
        <Link to={`${route.path}/${username}?id=${id}`}>
          <span className={styles.btn}>
            <FontAwesomeIcon icon={faEye} />
          </span>
        </Link>
        <span className={`${styles.btn} ${styles.delete}`}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </td>
    </tr>
  );
};

export default LineUser;
