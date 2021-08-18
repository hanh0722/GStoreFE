import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchBox from "../SearchBox/SearchBox";
import WrapperBlog from "../../layout/WrapperBlog/WrapperBlog";
import LayoutPost from "../LayoutPost/LayoutPost";
import usePagination from "../hook/use-pagination";
import styles from "./SearchingPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import removeUnicode from '../RemoveUnicode/RemoveUnicode';
const SearchingPost = ({ data, params }) => {
  const {
    nextPage,
    prevPage,
    pages,
    currentPage,
    paginationGroup,
    changeThePage,
    ourPagesTotal,
  } = usePagination(data, 2, 2);
  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8}>
        {data.length === 0 && (
          <p className={styles.none}>
            Không tồn tại bài viết cho từ khóa <span>{params}</span>{" "}
          </p>
        )}
        {data.length > 0 &&
          data &&
          pages().map((items) => {
            return (
              <LayoutPost
                key={items.id}
                title={items.title}
                content={items.content1}
                image={items.image1}
                link={removeUnicode(items.title)}
                id={items.id}
              />
            );
          })}
        {data.length > 0 && data && (
          <ul className={styles.pagination}>
            <li
              className={currentPage === 1 ? styles["disabled-btn"] : ""}
              onClick={prevPage}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </li>
            {paginationGroup().map((items) => {
              return (
                <li
                  onClick={changeThePage}
                  className={currentPage === items ? styles.active : ""}
                  key={items}
                >
                  {items}
                </li>
              );
            })}
            <li
              onClick={nextPage}
              className={
                currentPage === ourPagesTotal ? styles["disabled-btn"] : ""
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </li>
          </ul>
        )}
      </Col>
      <Col xs={12} sm={12} md={4} lg={4} className={styles.box}>
        <WrapperBlog>
          <SearchBox/>
        </WrapperBlog>
      </Col>
    </Row>
  );
};

export default SearchingPost;
