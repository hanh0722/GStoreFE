import React, { useEffect } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./components/Pages/Home";
import Blog from "./components/Pages/Blog";
import { useSelector, useDispatch } from "react-redux";
import { layoutActions, signInActions } from "./components/redux-store/Store";
import LinkNavigation from "./components/Navigation/LinkNavigation";
import Signin from "./components/Pages/Signin";
import FeaturePage from "./components/Pages/FeaturePage";
import IntroductionPage from "./components/Pages/IntroductionPage";
import Screen from "./components/Pages/Screen";
import AboutUs from "./components/Pages/AboutUs";
import ChangingPost from "./components/Dashboard/ChangingPost/ChangingPost";
import Users from "./components/Dashboard/Users/Users";
import FormPost from "./components/Dashboard/FormPost/FormPost";
import { buttonActions } from "./components/redux-store/button";
import RegisterPage from './components/Register/RegisterPage'
import {
  HomePageLink,
  FeatureLink,
  IntroductionLink,
  ScreenLink,
  AboutUsLink,
  BlogLink,
  BlogDetailLink,
  ADMIN,
  DASHBOARD_LINK,
  NOTFOUND_LINK,
  APP_INTRODUCTION,
  SEARCH,
} from "./components/link/link";
import BlogDetail from "./components/Pages/BlogDetail";
import NotFound from "./components/404NotFound/NotFound";
import AppIntroduction from "./components/Pages/AppIntroduction";
import MainDashBoard from "./components/Pages/MainDashboard";
import BlogDashboard from "./components/Dashboard/BlogDashboard/BlogDashboard";
import Register from "./components/Dashboard/Register/Register";
import UserDetail from "./components/Dashboard/UserDetail/UserDetail";
import SearchPage from "./components/Pages/SearchPage";
import { adminInformation } from "./components/redux-store/Store";
import TopButton from "./components/TopButton/TopButton";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      offset: 200,
      delay: 500,
    });
    const scrollUpTop = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > 200) {
        dispatch(buttonActions.showUpHandler());
      } else {
        dispatch(buttonActions.removeHandler());
      }
    };
    window.addEventListener("scroll", scrollUpTop);
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const signIn = localStorage.getItem("isSignedIn");
    if (!signIn) {
      return;
    }
    dispatch(signInActions.SignIn(JSON.parse(signIn)));
    dispatch(adminInformation());
  }, [dispatch]);
  const isClicked = useSelector((state) => state.layout.isClicked);
  const toggleHandler = () => {
    dispatch(layoutActions.toggleLayout());
  };
  return (
    <>
      <LinkNavigation toggle={toggleHandler} transform={isClicked} />
      <TopButton />
      <Switch>
        <Route path={HomePageLink} exact component={Home} />
        <Route path={ADMIN.ADMIN_BASIC} exact>
          <Home />
        </Route>
        <Route path={FeatureLink} component={FeaturePage} />
        <Route path={IntroductionLink} component={IntroductionPage} />
        <Route path={ScreenLink} component={Screen} />
        <Route path={AboutUsLink} component={AboutUs} />
        <Route path={BlogDetailLink} component={BlogDetail} />
        <Route path={NOTFOUND_LINK} component={NotFound} />
        <Route path={APP_INTRODUCTION} component={AppIntroduction} />
        <Route path={ADMIN.ADMIN_LOGIN} exact>
          <Signin />
        </Route>
        <Route path={ADMIN.ADMIN_REGISTER} component={RegisterPage} />
        <Route path={BlogLink} component={Blog} exact />
        <Route path={SEARCH} component={SearchPage} />
        {/* Dashboard Admin */}
        <Route path={DASHBOARD_LINK.DASHBOARD} component={MainDashBoard} />
        <Route path={DASHBOARD_LINK.BLOG} component={BlogDashboard} exact />
        <Route path={DASHBOARD_LINK.CREATE_BLOG} component={FormPost} />
        <Route
          path={DASHBOARD_LINK.NESTED_ROUTE.FIX_BLOG}
          component={ChangingPost}
        />
        <Route path={DASHBOARD_LINK.REGISTER} component={Register} />
        <Route path={DASHBOARD_LINK.USER} component={Users} exact />
        <Route
          path={DASHBOARD_LINK.NESTED_ROUTE.USER_DETAIL}
          component={UserDetail}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
