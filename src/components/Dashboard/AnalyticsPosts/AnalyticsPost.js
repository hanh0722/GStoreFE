import React, { useEffect } from "react";
import Container from "../helper/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchingPostsHandler } from "../../redux-store/get-posts";
import Loading from "../../../UI/Loading/Loading";
import styles from "./AnalyticsPost.module.scss";
const AnalyticsPost = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.getPosts.status);
  const error = useSelector((state) => state.getPosts.error);
  const data = useSelector((state) => state.getPosts.posts);
  useEffect(() => {
    dispatch(fetchingPostsHandler());
  }, [dispatch]);
  return (
    <Container className={styles.row}>
      <div className={styles.line}>
        <h3>Số lượng bài viết</h3>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faRss} />
        </div>
      </div>
      {loading === "pending" && !error && (
        <Loading className={styles.loading} />
      )}
      {loading === "completed" && !error && (
        <>
          <div className={styles.box}>
              <div className={styles.col}>
              {data.length}
              </div>
          </div>
        </>
      )}
      {loading === "completed" && error && (
        <p className={styles.invalid}>Có lỗi xảy ra, xin thử lại sau</p>
      )}
    </Container>
  );
};

export default AnalyticsPost;
