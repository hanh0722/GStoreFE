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
import {
  HomePageLink,
  FeatureLink,
  IntroductionLink,
  ScreenLink,
  AboutUsLink,
  BlogLink,
  BlogDetailLink,
} from "./components/link/link";
import BlogDetail from "./components/Pages/BlogDetail";
import NotFound from "./components/404NotFound/NotFound";
import AppIntroduction from "./components/Pages/AppIntroduction";
import MainDashBoard from "./components/Pages/MainDashboard";
import BlogDashboard from "./components/Dashboard/BlogDashboard/BlogDashboard";
import Register from "./components/Dashboard/Register/Register";
import UserDetail from "./components/Dashboard/UserDetail/UserDetail";
const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      offset: 120,
      delay: 200,
    });
  }, []);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const signIn = localStorage.getItem("isSignedIn");
    if (!signIn) {
      return;
    }
    dispatch(signInActions.SignIn(JSON.parse(signIn)));
  }, [dispatch]);
  const isClicked = useSelector((state) => state.layout.isClicked);
  const toggleHandler = () => {
    dispatch(layoutActions.toggleLayout());
  };
  return (
    <>
      <LinkNavigation toggle={toggleHandler} transform={isClicked} />
      <Switch>
        <Route path={HomePageLink} exact component={Home} />
        <Route path="/admin" exact>
          <Home />
        </Route>
        <Route path={FeatureLink} component={FeaturePage} />
        <Route path={IntroductionLink} component={IntroductionPage} />
        <Route path={ScreenLink} component={Screen} />
        <Route path={AboutUsLink} component={AboutUs} />
        <Route path={BlogDetailLink} component={BlogDetail} />
        <Route path='/404' component={NotFound}/>
        <Route path="/ung-dung" component={AppIntroduction} />
        <Route path="/admin/dang-nhap">
          <Signin />
        </Route>
        <Route path={BlogLink}>
          <Blog />
        </Route>
        {/* Dashboard Admin */}
        <Route path='/admin/dashboard/bang-dieu-khien' component={MainDashBoard}/>
        <Route path='/admin/dashboard/tin-tuc' component={BlogDashboard} exact/>
        <Route path='/admin/dashboard/tin-tuc/:name' component={ChangingPost}/>
        <Route path='/admin/dashboard/dang-ky' component={Register}/>
        <Route path='/admin/dashboard/user' component={Users} exact/>
        <Route path='/admin/dashboard/user/:username' component={UserDetail}/>
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
