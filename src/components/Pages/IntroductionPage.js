import React from "react";
import Wrapper from "../helper/Wrapper";
import Subscription from "../Subscription/Subscription";
import { Helmet } from "react-helmet";
const IntroductionPage = () => {
  return (
    <>
      <Helmet>
        <title>Giới Thiệu - GSTORE</title>
      </Helmet>
      <Wrapper title='Giới Thiệu'>
        <Subscription />
      </Wrapper>
    </>
  );
};

export default IntroductionPage;
