import React, { useEffect } from "react";
import styles from "../scss/BlogDetail.module.scss";
import Wrapper from "../helper/Wrapper";
import { Col, Row } from "react-bootstrap";
import BlogComponent from "../BlogComponent/BlogComponent";
import Layout from "../../layout/Layout/Layout";
import RecentPost from "../RecentPost/RecentPost";
import { useLocation } from "react-router-dom";
import useHttp from "../hook/use-http";
import { Helmet } from "react-helmet";
const BlogDetail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsId = params.get("id");
  const { data, status, fetchingDataHandler } = useHttp();
  useEffect(() => {
    fetchingDataHandler({
      url: `http://localhost:3001/get-post/${paramsId}`,
    });
  }, [fetchingDataHandler, paramsId]);
  return (
    status === "completed" && (
      <>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <Wrapper title={data.title}>
          <Layout className={styles.container}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <img
                  src={require(`../../img/images/${data.image1}`).default}
                  alt=""
                />
                <p className={styles.content}>{data.content1}</p>
                <img
                  src={require(`../../img/images/${data.image2}`).default}
                  alt=""
                />
                <p className={styles.content}>{data.content2}</p>
                <img
                  src={require(`../../img/images/${data.image3}`).default}
                  alt=""
                />
                <p className={styles.content}>{data.content3}</p>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <BlogComponent />
                <RecentPost />
              </Col>
            </Row>
          </Layout>
        </Wrapper>
      </>
    )
  );
};

export default BlogDetail;
