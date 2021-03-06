import React from "react";
import Layout from "../../layout/Layout/Layout";
import styles from "../scss/Form.module.scss";
import Input from "../../UI/Input";
import { Button } from "@material-ui/core";
import useInput from "../hook/use-input";
import useHttp from "../hook/use-http";
import Loading from "../../UI/Loading/Loading";
import { useHistory } from "react-router-dom";
import { ADMIN } from "../link/link";
const RegisterPage = () => {
  const {fetchingDataHandler, error, status, data, resetState} = useHttp();
  const history = useHistory();
  const {
    valueInput: emailInput,
    changeInputHandler: changeEmailHandler,
    isTouched: emailIsTouched,
    inputIsTouchedHandler: emailIsTouchedHandler,
    isValid: emailIsValid,
  } = useInput(
    (valueEmail) => valueEmail.trim().length > 0 && valueEmail.includes("@")
  );
  const {
    valueInput: nameInput,
    changeInputHandler: changeNameHandler,
    isTouched: nameIsTouched,
    isValid: nameIsValid,
    inputIsTouchedHandler: nameIsTouchedHandler,
  } = useInput((valueName) => valueName.trim().length > 0);
  const {
    valueInput: passwordInput,
    changeInputHandler: passwordChangeHandler,
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    inputIsTouchedHandler: passwordIsTouchedHandler,
  } = useInput((valuePassword) => valuePassword.trim().length >= 8);
  const submitHandler = event =>{
    event.preventDefault();
    resetState();
    if(!nameIsValid || !emailIsValid || !passwordIsValid){
      return;
    }
    
    fetchingDataHandler({
      url: 'http://localhost:3001/register',
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: {
        name: nameInput,
        email: emailInput,
        password: passwordInput
      }
    })
  }
  if(data && !error && status === 'completed'){
    history.push(ADMIN.ADMIN_LOGIN);
  }
  return (
    <>
    {status === 'loading' && <Loading className={styles.loading}/>}
    <form onSubmit={submitHandler} className={styles.form}>
      <Layout className={styles.layout}>
        <Input
          input={{
            type: "text",
            id: "name",
            label: "T??n",
            placeholder: "T??n...",
            value: nameInput,
            onChange: changeNameHandler,
            onBlur: nameIsTouchedHandler,
          }}
          className={!nameIsValid && nameIsTouched && styles["form-invalid"]}
        />
        {nameIsTouched && !nameIsValid && (
          <p className={styles.invalid}>T??n kh??ng ???????c ????? tr???ng</p>
        )}
        <Input
          input={{
            type: "email",
            id: "email",
            label: "Email",
            placeholder: "Email...",
            value: emailInput,
            onChange: changeEmailHandler,
            onBlur: emailIsTouchedHandler,
          }}
          className={emailIsTouched && !emailIsValid && styles["form-invalid"]}
        />
        {emailIsTouched && !emailIsValid && (
          <p className={styles.invalid}>Email Kh??ng H???p L???</p>
        )}
        <Input
          input={{
            type: "password",
            id: "password",
            label: "Password",
            placeholder: "Password...",
            onChange: passwordChangeHandler,
            value: passwordInput,
            onBlur: passwordIsTouchedHandler,
          }}
          className={
            !passwordIsValid && passwordIsTouched && styles["form-invalid"]
          }
        />
        
        {!passwordIsValid && passwordIsTouched && (
          <p className={styles.invalid}>Password ph???i t??? 8 k?? t??? tr??? l??n</p>
        )}
        <div className={`${styles.submit}`}>
          <Button
            disabled={!passwordIsValid && !nameIsValid && !emailIsValid}
            className={
              (!passwordIsValid ||
              !nameIsValid ||
              !emailIsValid) ?
              styles["btn-submit"]
              : ''
            }
            variant="contained"
            type={"submit"}
          >
            ????ng nh???p
          </Button>
        </div>

        {error && <p className={styles.invalid}>Email ???? ???????c s??? d???ng, xin qu?? kh??ch d??ng email kh??c!</p>}
      </Layout>
    </form>
    </>
  );
};

export default RegisterPage;
