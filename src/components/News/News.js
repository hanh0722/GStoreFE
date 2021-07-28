import React, { useEffect } from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "./News.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import classes from "../ViewApp/Screen.module.scss";
import NewsComponent from "./NewsComponent";
import useHttp from "../hook/use-http";
import Loading from "../../UI/Loading/Loading";
import RemoveUnicode from "../RemoveUnicode/RemoveUnicode";
SwiperCore.use([EffectCoverflow, Pagination]);
const News = () => {
  const { fetchingDataHandler, status, data } = useHttp();
  useEffect(() => {
    fetchingDataHandler({
      url: `http://localhost:3001/post/news/${6}`,
    });
  }, [fetchingDataHandler]);
  return (
    <Layout className={styles.container} aos="fade-up">
      <h2>Tin tức</h2>
      <p>Điểm tin hàng tuần với G-STORE</p>
      {status === "pending" && (
        <Loading className={styles["loading-spinner"]} />
      )}
      {status === "completed" && data && (
        <Swiper
          className={classes.slider}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          breakpoints={{
            200: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            772: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
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
          {data.map((items) => {
            const path = RemoveUnicode(items.title);
            return (
              <SwiperSlide key={items.id} className={classes.slider}>
                <NewsComponent
                  date={items.dateblog}
                  url={require(`../../img/images/${items.image1}`).default}
                  title={items.title}
                  content={items.content1}
                  path={`/tin-tuc/${path}?id=${items.id}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Layout>
  );
};

export default News;
