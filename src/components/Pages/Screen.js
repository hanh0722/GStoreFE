import React from "react";
import Wrapper from "../helper/Wrapper";
import ViewApp from "../ViewApp/ViewApp";
import { Helmet } from "react-helmet";
const Screen = () => {
  return (
    <>
      <Helmet>
        <title>Màn Hình Ứng Dụng - GSTORE</title>
      </Helmet>
      <Wrapper title='Màn Hình'>
        <ViewApp />
      </Wrapper>
    </>
  );
};

export default Screen;
