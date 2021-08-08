import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import {
  faChartBar,
  faIdBadge,
  faNewspaper,
  faAddressCard,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveUnicode from "../../RemoveUnicode/RemoveUnicode";
import styles from "./SideBar.module.scss";
import { Button } from "@material-ui/core";
import Overlay from "../../Overlay/Overlay";
import ButtonSideBar from "./ButtonSideBar";
import ReactDOM from 'react-dom';
const title = ["Bảng điều khiển", "User", "Tin tức", "Đăng ký"];
const icons = [faChartBar, faIdBadge, faNewspaper, faAddressCard];
const SideBar = () => {
    const [isClicked, setIsClicked] = useState(false);
  const renderSideBar = title.map((items, index) => {
    const path = RemoveUnicode(items);
    return (
      <NavLink to={`/admin/dashboard/${path}`} key={index}>
        <li>
          <FontAwesomeIcon icon={icons[index]} /> <span>{items}</span>
        </li>
      </NavLink>
    );
  });
  const setClickedHandler = () =>{
      setIsClicked(prevState => !prevState);
  }
  return (
    <>
      <Col className={`${styles["side-bar"]} ${isClicked && styles['side-bar-back']}`} xs={9} sm={6} md={3} lg={3}>
        <ul>{renderSideBar}</ul>
        <Button onClick={setClickedHandler} variant="contained">
          <div className={styles.btn}>
            <div></div>
            <div></div>
          </div>
        </Button>
      </Col>
        <ButtonSideBar isClicked={isClicked} clickHandler={setClickedHandler}/>
        {isClicked && ReactDOM.createPortal(<Overlay layout={setClickedHandler}/>, document.getElementById('overlay'))}
    </>
  );
};

export default SideBar;
