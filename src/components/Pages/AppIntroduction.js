import React from "react";
import p1 from "../../img/images/ScreenApp/1.PNG";
import p2 from "../../img/images/ScreenApp/2.PNG";
import p3 from "../../img/images/ScreenApp/3.PNG";
import p4 from "../../img/images/ScreenApp/13.PNG";
import Layout from "../../layout/Layout/Layout";
import { Row, Col } from "react-bootstrap";
import styles from "../scss/AppIntroduction.module.scss";
import Wrapper from "../helper/Wrapper";
import { Helmet } from "react-helmet";
import { Button } from "@material-ui/core";
const images = [p2, p3, p4];
const content = [
  "Khi ấn vào ô nhập số điện thoại, quý khách hàng nhập số điện thoại để tiếp tục. Sau đó hệ thống sẽ gửi về 1 mã OTP gồm 6 số đến số điện thoại của quý khách.",
  "Sau khi nhập mã OTP 6 số, quý khách sẽ hiện ra màn hình chính với đầy đủ các tính năng trên ứng dụng G-STORE.",
  "Khu vực danh mục của ứng dụng G-STORE với đầy đủ các sản phẩm, dịch vụ quý khách cần tìm kiếm.",
];
const AppIntroduction = () => {
  return (
    <>
      <Helmet>
        <title>Hướng Dẫn Cài Đặt Ứng Dụng G-STORE - GSTORE</title>
      </Helmet>
      <Wrapper title="Hướng Dẫn Cài Đặt Ứng Dụng G-STORE">
        <Layout className={styles.container}>
          <ul>
            <li>
              <Row className={styles.row}>
                <Col xs={12} sm={12} md={7} lg={7}>
                  <h4>Bước 1:</h4>
                  <p>
                    Sau khi tải ứng dụng G-STORE từ AppStore (đối với IOS) và
                    CH-Play (đối với Android). Sau khi cửa sổ hiện ra, quý khách
                    hàng nhập số điện thoại để tạo tài khoản trên ứng dụng
                    G-STORE.
                  </p>
                  <div className={styles.button}>
                    <a href="https://apps.apple.com/vn/app/g-store/id1537350489">
                      <Button className={styles['btn-1']} variant="contained">APPSTORE</Button>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.company.gstore_app">
                      <Button className={styles['btn-2']} variant="contained">CH-PLAY</Button>
                    </a>
                  </div>
                </Col>
                <Col className={styles.img} xs={6} sm={6} md={3} lg={3}>
                  <img src={p1} alt="" />
                </Col>
              </Row>
            </li>
            {content.map((items, index) => {
              return (
                <li key={index}>
                  <Row className={styles.row}>
                    <Col xs={12} sm={12} md={7} lg={7}>
                      <h4>Bước {index + 2}</h4>
                      <p>{items}</p>
                    </Col>
                    <Col className={styles.img} xs={6} sm={6} md={3} lg={3}>
                      <img src={images[index]} alt="" />
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Layout>
      </Wrapper>
    </>
  );
};

export default AppIntroduction;
