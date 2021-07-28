import React, { useEffect } from "react";
import Container from "../container/Container";
import Layout from "../Layout/Layout";
import useHttp from "../../hook/use-http";
import Loading from "../../../UI/Loading/Loading";
import styles from "./Users.module.scss";
import LineUser from "./LineUser/LineUser";
const Users = () => {
  const { fetchingDataHandler, status, data, error } = useHttp();
  useEffect(() => {
    fetchingDataHandler({
      url: "http://localhost:3001/api/users",
    });
  }, [fetchingDataHandler]);

  return (
    <>
      <Layout title='Quản Lý User'>
        <Container>
          {status === "pending" && <Loading className={styles.loading} />}
          {status === "completed" && data && (
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
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {error && !data && <p>Có lỗi xảy ra, xin thử lại sau</p>}
        </Container>
      </Layout>
    </>
  );
};

export default Users;
