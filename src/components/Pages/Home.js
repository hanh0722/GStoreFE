import React from "react";
import Feature from "../Feature/Feature";
import Subscription from "../Subscription/Subscription";
import Download from "../Download/Download";
import News from "../News/News";
import Partner from "../Partner/Partner";
import Navigation from "../Navigation/Navigation";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Trang Chủ - GSTORE</title>
      </Helmet>
      <Navigation />
      <Feature />
      <Download />
      <News />
      <Subscription />
      <Partner />
    </>
  );
};

export default Home;
