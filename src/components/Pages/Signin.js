import React, { useState } from "react";
import styles from "../scss/Form.module.scss";
import Input from "../../UI/Input";
import Layout from "../../layout/Layout/Layout";
import { Button } from "@material-ui/core";
import useInput from "../hook/use-input";
import { useHistory, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { signInActions } from "../redux-store/Store";
const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isValidSignIn, setIsValidSignIn] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);
  const {
    isValid: emailIsValid,
    isTouched: emailInputIsTouched,
    valueInput: valueEmailInput,
    inputIsTouchedHandler: inputEmailIsTouched,
    changeInputHandler: changeEmailHandler,
    resetInputHandler: resetEmailHandler,
  } = useInput((value) => value.trim().length > 0 && value.includes("@"));

  const {
    isValid: passwordIsValid,
    isTouched: passwordIsTouched,
    valueInput: passwordValue,
    inputIsTouchedHandler: passwordIsTouchedHandler,
    changeInputHandler: changePasswordHandler,
    resetInputHandler: resetPasswordHandler,
  } = useInput((value) => value.trim().length >= 8);
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    resetEmailHandler();
    resetPasswordHandler();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: valueEmailInput,
        password: passwordValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (!data.id) {
          setIsValidSignIn(false);
        } else if (data.islocked) {
          setIsLocked(true);
          return;
        } else {
          dispatch(signInActions.SignIn(data.id));
          localStorage.setItem("isSignedIn", data.id);
          history.push("/admin/dashboard/bang-dieu-khien");
        }
      })
      .catch((err) => console.log(err));
  };
  let formIsValid = emailIsValid && passwordIsValid;
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Layout className={styles.layout}>
        {isSignedIn ? (
          <div className={styles['roll-back']}>
            <p className={styles.notification}>Bạn đã đăng nhập</p>
            <div className={styles['btn-rb']}>
            <Link to='/admin/dashboard/bang-dieu-khien'><Button variant='contained'>Dashboard</Button></Link>
            </div>
          </div>
        ) : (
          <>
            <Input
              input={{
                value: valueEmailInput,
                type: "email",
                id: "email",
                label: "Email",
                placeholder: "Email...",
                onChange: changeEmailHandler,
                onBlur: inputEmailIsTouched,
              }}
              className={!emailIsValid && emailInputIsTouched && "invalid"}
            />
            {!emailIsValid && emailInputIsTouched && (
              <p className={styles.invalid}>Email không hợp lệ!</p>
            )}
            <Input
              input={{
                value: passwordValue,
                type: "password",
                id: "password",
                label: "Password",
                placeholder: "Password...",
                onChange: changePasswordHandler,
                onBlur: passwordIsTouchedHandler,
              }}
              className={!passwordIsValid && passwordIsTouched && "invalid"}
            />
            {!passwordIsValid && passwordIsTouched && (
              <p className={styles.invalid}>Password phải trên 8 ký tự!</p>
            )}
            <div
              className={`${styles.submit} ${
                !formIsValid && styles["submit-invalid"]
              }`}
            >
              <Button
                disabled={!formIsValid}
                variant="contained"
                type={"submit"}
              >
                Đăng nhập
              </Button>
            </div>
            {isLocked && (
              <p className={styles["invalid-signIn"]}>
                Tài khoản của bạn đã bị khóa!
              </p>
            )}
            {!isValidSignIn && (
              <p className={styles["invalid-signIn"]}>
                Tài khoản hoặc mật khẩu không chính xác!
              </p>
            )}
            {isLoading && <Loading />}
          </>
        )}
      </Layout>
    </form>
  );
};

export default Signin;
