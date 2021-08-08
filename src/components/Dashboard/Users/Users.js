import React, { useEffect, useState } from "react";
import Container from "../container/Container";
import Layout from "../Layout/Layout";
import useHttp from "../../hook/use-http";
import Loading from "../../../UI/Loading/Loading";
import styles from "./Users.module.scss";
import LineUser from "./LineUser/LineUser";
import DeleteUser from "./LineUser/DeleteUser";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import OverlayPortals from "../../Overlay/OverlayPortal";
import UIBox from "../UIBox/UIBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
const Users = () => {
  const history = useHistory();
  const { fetchingDataHandler, status, data, error } = useHttp();
  const {
    fetchingDataHandler: removeUser,
    data: responseUser,
    status: statusUser,
    error: errorUser,
  } = useHttp();
  const [deleteUserClicked, setDeleteUserClicked] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    fetchingDataHandler({
      url: "http://localhost:3001/api/users",
    });
  }, [fetchingDataHandler]);
  useEffect(() => {
    if (responseUser || errorUser) {
      console.log(0);
      setIsFinished(false);
    }
    return () => {
      console.log(1);
      setIsFinished(true);
    };
  }, [responseUser, errorUser]);
  const setClickHandler = (data) => {
    setDeleteUserClicked(data);
  };
  const setAgainHandler = () => {
    setDeleteUserClicked(null);
  };
  const removeUserHandler = () => {
    removeUser({
      url: "http://localhost:3001/api/remove-user",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: {
        username: deleteUserClicked.username,
      },
    });
  };
  return (
    <>
      <Layout title="Quản Lý User">
        <Container>
          {status === "pending" && <Loading className={styles.loading} />}
          {status === "completed" && data && data.length > 0 && (
            <div className={styles.table}>
              <table className={styles["user-tb"]}>
                <tbody>
                  <tr>
                    <th>Email đăng nhập</th>
                    <th>Tên</th>
                  </tr>
                  {data.map((user) => {
                    return (
                      <LineUser
                        key={user.id}
                        id={user.id}
                        username={user.username}
                        name={user.name}
                        onDelete={setClickHandler}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {status === "completed" && data.length === 0 && (
            <p>Không tồn tại user nào</p>
          )}
          {error && !data && <p>Có lỗi xảy ra, xin thử lại sau</p>}
        </Container>
      </Layout>
      <CSSTransition
        in={!!deleteUserClicked}
        classNames={{
          enter: styles["fade-enter-active"],
          exit: styles["fade-exit-active"],
        }}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <>
          <DeleteUser
            dataUser={deleteUserClicked}
            onRemoveUser={removeUserHandler}
            onRemove={setAgainHandler}
          />
          {ReactDOM.createPortal(
            <OverlayPortals layout={setAgainHandler} />,
            document.getElementById("overlay")
          )}
        </>
      </CSSTransition>
      {statusUser === "pending" && (
        <Loading className={styles["loading-user"]} />
      )}
      <CSSTransition in={!isFinished} classNames={{
        enter: styles['notification-enter-active'],
        exit: styles['notification-exit-active']
      }} timeout={1000} mountOnEnter unmountOnExit>
        <UIBox>
          <div
            className={
              errorUser ? styles["user__invalid"] : styles["user__success"]
            }
          >
            <FontAwesomeIcon icon={errorUser ? faTimesCircle : faCheckCircle} />{" "}
            {errorUser ? "Xóa thất bại" : "Xóa thành công"}
          </div>
        </UIBox>
      </CSSTransition>
    </>
  );
};

export default Users;
