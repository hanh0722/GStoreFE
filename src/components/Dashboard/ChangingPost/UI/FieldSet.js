import React, { useEffect, useState } from "react";
import styles from "./FieldSet.module.scss";
import TextArea from "./Input/TextArea";
import { useLocation, Redirect } from "react-router-dom";
import Dropzone from "./Dropzone/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import { fetchingPosts } from "../../../redux-store/change-post";
import Loading from "../../../../UI/Loading/Loading";
import { changePostActions } from "../../../redux-store/change-post";
const FieldSet = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const status = useSelector((state) => state.post.status);
  const data = useSelector((state) => state.post.information);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingPosts(id));
  }, [id, dispatch]);
  let array = [];
  if(data){
    array.push(data.image1);
    array.push(data.image2);
    array.push(data.image3);
  }
  // one bug with data is not updated immediately after coming back from fixing,
  // because of asynchonorous JS, temporary can't fix it, use <a> for temporary
  // use effect run it after loading the component, so the old state of redux is the same => but fs will delete files in BE => error
  const setIsTouchedHandler = () =>{
    setIsTouched(true);
  }
  return (
    <>
      {status === "pending" && !data && (
        <Loading className={styles["loading-spinner"]} />
      )}
      {status === "error" && !data && <Redirect to="/404" />}
      {status === "success" && data && (
        <div className={styles.form}>
          <TextArea
            textField={{
              variant: "outlined",
              label: "Tiêu Đề",
              placeholder: "Tiêu đề trang",
              multiline: true,
              defaultValue: data.title,
              onChange: (event) => dispatch(changePostActions.updateTitle(event.target.value)),
              onBlur: setIsTouchedHandler,
              error: data.title.trim().length === 0 && isTouched
            }}
          />
          {data.title.trim().length === 0 && isTouched && <p className={styles.error}>Tiêu đề không được để trống</p>}
          <TextArea
            textField={{
              label: "Nội Dung 1",
              placeholder: "Nội dung trong trang",
              variant: "outlined",
              multiline: true,
              defaultValue: data.content1,
              onChange: event => dispatch(changePostActions.updateContent1(event.target.value))
            }}
          />
          <TextArea
            textField={{
              variant: "outlined",
              label: "Nội Dung 2",
              placeholder: "Nội dung trong trang",
              multiline: true,
              defaultValue: data.content2,
              onChange: event => dispatch(changePostActions.updateContent2(event.target.value))
            }}
          />
          <TextArea
            textField={{
              variant: "outlined",
              label: "Nội Dung 3",
              placeholder: "Nội dung trong trang",
              multiline: true,
              defaultValue: data.content3,
              onChange: event => dispatch(changePostActions.updateContent3(event.target.value))
            }}
          />
          <div>
            <Dropzone array={array} uploadNewImages={props.setNewImages}/>
          </div>
        </div>
      )}
    </>
  );
};

export default FieldSet;
