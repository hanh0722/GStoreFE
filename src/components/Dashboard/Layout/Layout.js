import React from "react";
import { Row, Container } from "react-bootstrap";
import styles from "./Layout.module.scss";
import Wrapper from "../../helper/Wrapper";
import SideBar from "../SideBar/SideBar";
import SystemRight from "../RightSide/SystemRight";
import { Redirect } from "react-router-dom";
import {ADMIN} from '../../link/link';
const Layout = (props) => {
  return (
    <>
    {!localStorage.getItem('isSignedIn') && <Redirect to={ADMIN.ADMIN_LOGIN}/>}
      <Wrapper title={props.title}>
        <Container>
          <Row className={styles.container}>
            <SideBar />
            <SystemRight>
                {props.children}
            </SystemRight>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
};

export default Layout;
