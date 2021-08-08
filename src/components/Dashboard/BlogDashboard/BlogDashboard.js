import React, { useEffect, useState } from "react";
import BlogComponent from "./BlogComponent";
import Layout from "../Layout/Layout";
import SearchField from "./SearchField";
import Container from "../container/Container";
import { Row, Col } from "react-bootstrap";
import useHttp from "../../hook/use-http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import styles from "./BlogDashboard.module.scss";
import Loading from "../../Loading/Loading";
import RemoveUnicode from "../../RemoveUnicode/RemoveUnicode";
import { useHistory, useLocation } from "react-router-dom";
const BlogDashboard = () => {
  const { fetchingDataHandler, data, status } = useHttp();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("default");
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sorting = params.get("sort");
  useEffect(() => {
    if (!sorting || sorting === "default") {
      fetchingDataHandler({
        url: "http://localhost:3001/get-all-posts",
      });
    }
    else{
      fetchingDataHandler({
        url: `http://localhost:3001/post/${sorting}`
      })
    }
  }, [fetchingDataHandler, type, sorting]);
  const changeHandler = (event) => {
    setTitle(event.target.value);
  };
  const setPageHandler = () => {
    if (!data || data.length === 0 || status === "error") {
      return;
    }
    const filterPost = data.filter((items) => {
      return items.title.toLowerCase().includes(title);
    });
    const renderPost = filterPost.map((items) => {
      console.log(items.title);
      const transformLink = RemoveUnicode(items.title);
      return (
        <Col
          key={items.id}
          xs={12}
          sm={12}
          md={6}
          lg={4}
          className={styles.column}
        >
          <BlogComponent
            key={items.id}
            id={items.id}
            link={transformLink}
            title={items.title}
            date={items.dateblog}
            url={require(`../../../img/images/${items.image1}`).default}
          />
        </Col>
      );
    });
    if (renderPost.length === 0) {
      return (
        <Col style={{ fontWeight: "bold" }} xs={12} sm={12} md={12} lg={12}>
          Không tồn tại tin tức cho từ khóa: {title}
        </Col>
      );
    }
    return renderPost;
  };
  const changeSortingHandler = (event) => {
    setType(event.target.value);
    history.push(`/admin/dashboard/tin-tuc?sort=${event.target.value}`);
  };
  return (
    <>
      <Helmet>
        <title>Tin Tức - Dashboard Admin - GStoreVN</title>
      </Helmet>
      <Layout title="Tin Tức Dashboard">
        {status === "pending" ? (
          <Loading />
        ) : (
          <Container>
            <div className={styles.choosing}>
              <div className={styles.input}>
                <SearchField
                  input={{
                    placeholder: "Search...",
                    onChange: changeHandler,
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </SearchField>
              </div>
              <div className={styles.sorting}>
                <select value={sorting ? sorting : 'default'} onChange={changeSortingHandler}>
                  <option value="default">Mặc định</option>
                  <option value="desc">Mới nhất</option>
                  <option value="asc">Cũ nhất</option>
                </select>
              </div>
            </div>
            <Row>{setPageHandler()}</Row>
          </Container>
        )}
      </Layout>
    </>
  );
};

export default BlogDashboard;
