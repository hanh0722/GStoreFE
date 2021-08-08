import React, { useEffect, useState } from "react";
import styles from "../scss/LinkNavigation.module.scss";
import logo from "../../img/images/logo3.png";
import logoFixed from "../../img/images/logo-2.png";
import { Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import { createPortal } from "react-dom";
const link = [
  "Trang chủ",
  "Tính năng",
  "Giới Thiệu",
  "Màn hình",
  "Về chúng tôi",
  "Ứng dụng",
  "Tin tức",
];
const tag = [
  "",
  "tinh-nang",
  "gioi-thieu",
  "man-hinh",
  "ve-chung-toi",
  "ung-dung",
  "tin-tuc",
];
const LinkNavigation = ({ toggle, transform }) => {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const scrollFunction = () => {
      if (window.pageYOffset > 50) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
    window.addEventListener("scroll", scrollFunction);
  }, []);
  return (
    <>
      <nav className={`${styles["nav-bar"]} ${fixed && styles.fixed}`}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={fixed ? logoFixed : logo} alt="logo" />
          </NavLink>
        </div>
        <ul className={`${transform ? styles["nav-bar-block"] : ""}`}>
          {link.map((items, index) => {
            if (index === 0) {
              return (
                <NavLink
                key={index}
                  exact
                  activeClassName={styles.active}
                  to={`/${tag[index]}`}
                >
                  <li onClick={() => toggle()} key={index}>
                    {items}
                  </li>
                </NavLink>
              );
            }
            return (
              <NavLink key={index} activeClassName={styles.active} to={`/${tag[index]}`}>
                <li onClick={() => toggle()} key={index}>
                  {items}
                </li>
              </NavLink>
            );
          })}
          <Route path="/admin">
            <NavLink style={{ textDecoration: "none" }} to="/admin/dang-nhap">
              <Button className={styles.btn} variant="contained">
                Admin
              </Button>
            </NavLink>
          </Route>
        </ul>
        <div
          onClick={toggle}
          className={`${styles.hamburger} ${
            transform && styles["hamburger-transition"]
          }`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      {transform &&
        createPortal(
          <Overlay layout={toggle} />,
          document.getElementById("overlay")
        )}
    </>
  );
};

export default LinkNavigation;
