import React, { useEffect } from "react";
import WrapperBlog from "../../layout/WrapperBlog/WrapperBlog";
import styles from "./RecentPost.module.scss";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import useHttp from "../hook/use-http";
import Loading from "../../UI/Loading/Loading";
import RemoveUnicode from "../RemoveUnicode/RemoveUnicode";
import { useRouteMatch } from "react-router";
const RecentPost = () => {
  const { data, status, fetchingDataHandler } = useHttp();
  const route = useRouteMatch();
  useEffect(() => {
    fetchingDataHandler({
      url: "http://localhost:3001/post/news/3",
    });
  }, [fetchingDataHandler]);
  let value;
  if (status === "pending") {
    value = <Loading />;
  }
  if (!data || status === "error" || data.length === 0) {
    value = <p>Không có dữ liệu</p>;
  }
  if (data && status === "completed" && data.length > 0) {
    value = data.map((items) => {
      const pathLink = RemoveUnicode(items.title);
      return (
        <Row key={items.id} className={styles.row}>
          <Col xs={4} sm={4} md={4} lg={4}>
            <img src={require(`../../img/images/${items.image1}`).default} alt="" />
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <Link to={`${route.path}/${pathLink}?id=${items.id}`}>{items.title}</Link>
            <p className={styles.date}>
              <FontAwesomeIcon icon={faCalendar} />
              <span>{items.dateblog}</span>
            </p>
          </Col>
        </Row>
      );
    });
  }
  return (
    <WrapperBlog className={styles.container}>
      <p>Bài viết gần đây</p>
      {
        <div className={styles["recent-post"]}>
          {value}
        </div>
      }
    </WrapperBlog>
  );
};

export default RecentPost;
