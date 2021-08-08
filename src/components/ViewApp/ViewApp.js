import React from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./ViewApp.module.scss";
import Screen from "./Screen";
const ViewApp = () => {
  return (
    <Layout className={styles.screen} aos='fade-up'>
      <h2>Màn hình ứng dụng G-STORE</h2>
      <p className={styles.title}>
        Ứng dụng G-STORE với giao diện dễ sử dụng, mượt mà đồng thời kết hợp với
        những tính năng vượt trội mang lại trải nghiệm tốt nhất cho khách hàng.
      </p>
      <Screen/>
    </Layout>
  );
};

export default ViewApp;
