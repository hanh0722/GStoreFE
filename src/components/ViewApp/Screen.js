import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Screen.module.scss";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.scss";
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Pagination, Autoplay, Navigation]);
const test = [
  "1-min.PNG",
  "2-min.PNG",
  "3-min.PNG",
  "4-min.PNG",
  "5-min.PNG",
  "6-min.PNG",
  "7-min.PNG",
  "8-min.PNG",
  "9-min.PNG",
  "10-min.PNG",
  "11-min.PNG",
  "12-min.PNG",
  "13-min.PNG",
];
const Screen = () => {
  const renderSlider = test.map((items, index) => {
    return (
      <SwiperSlide className={styles.images} key={index}>
        <img
          src={require(`../../img/images/imagecompressor/${items}`).default}
          alt=""
          loading="lazy"
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      <Swiper
        className={styles.slider}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        breakpoints={{
          200: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          772: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        grabCursor
        onPaginationRender={(swiper, el) => {
          el.classList.add(styles.pagination);
        }}
      >
        {renderSlider}
      </Swiper>
    </>
  );
};

export default Screen;
