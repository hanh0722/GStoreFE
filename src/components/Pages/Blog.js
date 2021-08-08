import React from "react";
import Layout from "../../layout/Layout/Layout";
import NewestPost from "../BlogComponent/NewestPost";
import styles from "../scss/BlogPage.module.scss";
import Wrapper from "../helper/Wrapper";
import { Helmet } from "react-helmet";
const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Tin Tức - GSTORE</title>
      </Helmet>
      <Wrapper title='Tin Tức'>
        <Layout className={styles.container}>
          <NewestPost />
        </Layout>
      </Wrapper>
    </>
  );
};

export default Blog;
