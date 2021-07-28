import React from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./Navigation.module.scss";
import p1 from "../../img/images/phone_white-4.png";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudDownloadAlt,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
const Section = () => {
  return (
    <Layout>
      <div
        id="home"
        data-aos="fade-up"
        className={styles.container}
        data-aos-duration="1000"
      >
        <div className={styles.content}>
          <h1>
            Ứng dụng <span>kết nối</span> thông minh
          </h1>
          <p className={styles.introduction}>
            Giải pháp hàng đầu trong lĩnh vực chia sẻ, trao đổi hàng hóa, dịch
            vụ Bước chuyển mình trong công cuộc áp dụng nền tảng công nghệ 4.0,
            khẳng định giá trị của nền kinh tế chia sẻ.
          </p>
          <div className={styles.button}>
            <a href='#download'>
              <Button variant="outlined">
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
                <span>Tải ứng dụng</span>
              </Button>
            </a>
            <a href="tel:0866631088" className={styles["swipe-right-left"]}>
              <Button variant="outlined">
                <FontAwesomeIcon icon={faMobile} />
                <span>Liên hệ ngay</span>
              </Button>
            </a>
          </div>
        </div>
        <div className={styles.img}>
          <img src={p1} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Section;
