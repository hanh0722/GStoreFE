import React, { useEffect } from "react";
import styles from "../scss/NewestPost.module.scss";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogComponent from "./BlogComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouteMatch, useHistory } from "react-router-dom";
import RecentPost from "../RecentPost/RecentPost";
import useHttp from "../hook/use-http";
import RemoveUnicode from "../RemoveUnicode/RemoveUnicode";
import usePagination from "../hook/use-pagination";
import PaginationBlog from "./PaginationBlog";
const NewestPost = () => {
  const route = useRouteMatch();
  const history = useHistory();
  const { fetchingDataHandler, data, status, error } = useHttp();
  const {
    nextPage,
    prevPage,
    pages,
    currentPage,
    paginationGroup,
    changeThePage,
    ourPagesTotal,
  } = usePagination(data ? data : [], 2, 2);
  useEffect(() => {
    fetchingDataHandler({
      url: "http://localhost:3001/get-all-posts",
    });
  }, [fetchingDataHandler]);

  useEffect(() =>{
    history.push(`${route.path}?page=${currentPage}`);
  }, [currentPage, history, route.path])
  return (
    data &&
    data.length > 0 &&
    status === "completed" && (
      <>
        <Row className={styles.row}>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={`${styles.col} ${styles.newest}`}
          >
            <img
              src={require(`../../img/images/${data[0].image1}`).default}
              alt=""
            />
            <div className={styles.content}>
              <Link
                to={`${route.path}/${RemoveUnicode(data[0].title)}?id=${
                  data[0].id
                }`}
              >
                G-STORE – THỜI ĐIỂM VÀNG ĐỂ ĐẨY MẠNH KINH DOANH ONLINE
              </Link>
              <p className={styles.date}>
                <FontAwesomeIcon icon={faCalendarAlt} /> {data[0].dateblog}
              </p>
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={8}
            className={`${styles.col} ${styles.column}`}
          >
            {pages().map((items) => {
              const pathLink = RemoveUnicode(items.title);
              return (
                <div key={items.id} className={styles.news}>
                  <img
                    src={require(`../../img/images/${items.image1}`).default}
                    alt=""
                  />
                  <div className={styles.content}>
                    <Link to={`${route.path}/${pathLink}?id=${items.id}`}>
                      {items.title}
                    </Link>
                    <p className={styles.date}>
                      <FontAwesomeIcon icon={faCalendarAlt} /> {items.dateblog}
                    </p>
                  </div>
                </div>
              );
            })}
            <ul className={styles.pagination}>
              <li
                className={currentPage === 1 ? styles["disabled-btn"] : ""}
                onClick={() => {prevPage()}}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </li>
              <PaginationBlog
                numberOfPagination={paginationGroup}
                changeThePage={changeThePage}
                currentPage={currentPage}
              />
              <li
                className={
                  currentPage === ourPagesTotal ? styles["disabled-btn"] : ""
                }
                onClick={nextPage}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <BlogComponent />
            <RecentPost />
          </Col>
        </Row>
      </>
    )
  );
};

export default NewestPost;
