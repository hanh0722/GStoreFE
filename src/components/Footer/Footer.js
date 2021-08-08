import React from "react";
import styles from "./Footer.module.scss";
import Layout from "../../layout/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faAndroid,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Row, Col } from "react-bootstrap";
import logo from "../../img/images/logo4.png";

const link = [
  'https://www.facebook.com/G-STORE-K%E1%BA%BFt-N%E1%BB%91i-Gi%C3%A1-Tr%E1%BB%8B-107704574832148',
  "https://play.google.com/store/apps/details?id=com.company.gstore_app",
  "https://apps.apple.com/vn/app/g-store/id1537350489"
];
const Footer = () => {
  const icons = [faFacebook, faAndroid, faApple];
  const renderIcons = icons.map((items, index) => {
    return <a key={index} href={link[index]}><FontAwesomeIcon key={index} icon={items} /></a>;
  });
  return (
    <div className={styles.container}>
      <Layout>
        <Row className={styles.row}>
          <Col xs={12} sm={12} md={4} lg={4} className={styles.logo}>
            <img src={logo} alt="logo" />
            <p>G-STORE TECH COMPANY</p>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <ul className={styles["list-items"]}>
              <li>Ứng dụng kết nối thông minh G-STORE</li>
              <li className={styles.content}>
                Giải pháp hàng đầu trong lĩnh vực chia sẻ, trao đổi hàng hóa,
                dịch vụ
              </li>
              <li className={styles.icons}>{renderIcons}</li>
            </ul>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <ul className={styles["list-items-2"]}>
              <li>Địa chỉ liên hệ</li>
              <li className={styles.content}>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </p>
                <p>
                  Số 60, 132 đường Cầu Diễn, phường Minh Khai, quận Bắc Từ Liêm,
                  TP. Hà Nội
                </p>
              </li>
              <li className={styles["list-1"]}>
                <p>
                  <a href="tel: 0866631088">
                    <FontAwesomeIcon icon={faMobileAlt} />
                  </a>
                </p>
                <p>08 666 310 88</p>
              </li>
              <li>
                <p>
                  <a href="mailto:support@gstorevn.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </p>
                <p>support@gstorevn.com</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Footer;
