import React from "react";
import Layout from "../../layout/Layout/Layout";
import BoxFeature from "./BoxFeature/BoxFeature";
import styles from "./Feature.module.scss";
const Feature = () => {
  return (
    <Layout aos='fade-up' className={styles.container}>
        <h2>
          Tính năng vượt trội trên ứng dụng <span>G-Store</span>
        </h2>
        <p className={styles.title}>
          Tải ứng dụng ngay để trải nghiệm thực tế những tính năng hấp dẫn và
          thông minh để kết nối chia sẻ hàng hóa, dịch vụ với hàng ngàn người trên
          thế giới
        </p>
      <BoxFeature/>
    </Layout>
  );
};

export default Feature;
