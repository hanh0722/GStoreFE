import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Row, Col } from "react-bootstrap";
import { Input, Button } from "@material-ui/core";
import styles from "./Register.module.scss";
import useInput from "../../hook/use-input";
import useHttp from "../../hook/use-http";
import Loading from "../../../UI/Loading/Loading";
import ReactDOM from "react-dom";
import Success from "../BlogDashboard/SuccessMessage/Success";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Register = () => {
  const { status, data, fetchingDataHandler, error, setAgainHandler } =
    useHttp();
  const [back, setBack] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setBack(false);
    }, 3000);

    return () => {
      clearTimeout(time);
      setBack(true);
    };
  }, [error, status]);
  const {
    isTouched: inputEmailIsTouched,
    isValid: inputEmailIsValid,
    valueInput: valueEmail,
    inputIsTouchedHandler: inputEmailIsTouchedHandler,
    changeInputHandler: changeEmailHandler,
    resetInputHandler: resetEmailHandler,
  } = useInput((value) => value.trim().includes("@"));
  const {
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    valueInput: valuePassword,
    inputIsTouchedHandler: passwordIsTouchHandler,
    changeInputHandler: setPasswordHandler,
    resetInputHandler: resetPasswordHandler,
  } = useInput((value) => value.trim().length >= 8);
  const {
    isTouched: nameIsTouched,
    isValid: nameIsValid,
    valueInput: valueName,
    inputIsTouchedHandler: nameIsTouchedHandler,
    changeInputHandler: changeNameHandler,
    resetInputHandler: resetNameHandler,
  } = useInput((value) => value.trim().length > 0);
  const submitHandler = (event) => {
    setAgainHandler();
    event.preventDefault();
    if (!nameIsValid || !inputEmailIsValid || !passwordIsValid) {
      return;
    }
    const information = {
      email: valueEmail,
      password: valuePassword,
      name: valueName,
    };
    fetchingDataHandler({
      url: "http://localhost:3001/register",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: information,
    });
    resetEmailHandler();
    resetPasswordHandler();
    resetNameHandler();
  };
  return (
    <>
      <Layout title="Đăng Ký">
        <form onSubmit={submitHandler}>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} className={styles.col}>
              <label htmlFor="email">Email</label>
              <Input
                onBlur={inputEmailIsTouchedHandler}
                onChange={changeEmailHandler}
                value={valueEmail}
                type="text"
                id="email"
                placeholder="Email..."
                className={`${
                  !inputEmailIsValid && inputEmailIsTouched && "Mui-error"
                }`}
              />
              {!inputEmailIsValid && inputEmailIsTouched && (
                <p>Email không hợp lệ</p>
              )}
              <label htmlFor="password">Mật khẩu</label>
              <Input
                onBlur={passwordIsTouchHandler}
                value={valuePassword}
                onChange={setPasswordHandler}
                type="password"
                id="password"
                placeholder="Password..."
                className={`${
                  !passwordIsValid && passwordIsTouched && "Mui-error"
                }`}
              />
              {!passwordIsValid && passwordIsTouched && (
                <p>Mật khẩu không hợp lệ (ít nhất 8 ký tự)</p>
              )}
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className={styles.col}>
              <label htmlFor="name">Tên</label>
              <Input
                onBlur={nameIsTouchedHandler}
                value={valueName}
                onChange={changeNameHandler}
                type="text"
                id="name"
                placeholder="Tên..."
                className={`${!nameIsValid && nameIsTouched && "Mui-error"}`}
              />
              {!nameIsValid && nameIsTouched && <p>Tên không được để trống</p>}
            </Col>
          </Row>
          <div className={styles.btn}>
            <Button
              disabled={!nameIsValid || !inputEmailIsValid || !passwordIsValid}
              type="submit"
              variant="contained"
            >
              Đăng Ký
            </Button>
          </div>
          {error && (
            <>
              <p className={styles.error}>
                Email của bạn đã được sử dụng, vui lòng nhập email khác!
              </p>
              <Success
                className={`${styles["success__note"]} ${
                  back && styles["tps__back"]
                }`}
              >
                <span className={styles['success__wrong']}><FontAwesomeIcon icon={faTimesCircle} /></span> Đăng ký thất bại
              </Success>
            </>
          )}
          {data && status === "completed" && (
            <Success
              className={`${styles["success__note"]} ${
                back && styles["tps__back"]
              }`}
            >
              <span className={styles['success__correct']}><FontAwesomeIcon icon={faCheckCircle} /></span> Đăng ký thành công
            </Success>
          )}
        </form>
      </Layout>
      {status === "pending" &&
        ReactDOM.createPortal(
          <Loading className={styles.loading} />,
          document.getElementById("overlay")
        )}
    </>
  );
};

export default Register;
