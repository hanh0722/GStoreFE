import React from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./Partner.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination]);
const images = ["0.png", "1.png", "2.png", "3.png", "4.png"];
const Partner = () => {
  const renderSwiperSlide = images.map((items, index) => {
    return (
      <SwiperSlide key={index} className={styles.slide}>
        <img
          src={require(`../../img/images/Partner/${items}`).default}
          alt={items}
        />
      </SwiperSlide>
    );
  });
  return (
    <Layout className={styles.container} aos="fade-up">
      <h2>Đối tác của chúng tôi</h2>
      <p>Các đối tác liên kết với G-STORE</p>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        initialSlide={1}
        pagination={true}
        className={styles.swiper}
        breakpoints={{
          200: {
            initialSlide: 1,
            slidesPerView: "auto",
          },
          768: {
            slidesPerView: 3,
          },
        }}
      >
        {renderSwiperSlide}
      </Swiper>
    </Layout>
  );
};

export default Partner;
