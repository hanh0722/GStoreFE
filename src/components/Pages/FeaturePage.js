import React from "react";
import System from "../System/System";
import Wrapper from "../helper/Wrapper";
import { Helmet } from "react-helmet";
const FeaturePage = () => {
  return (
    <>
    <Helmet>
      <title>Tính năng - GSTORE</title>
    </Helmet>
    <Wrapper title='Tính Năng'>
      <System />
    </Wrapper>
    </>
  );
};

export default FeaturePage;
