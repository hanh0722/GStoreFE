import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { changePostActions } from "../../../../redux-store/change-post";
const Dropzone = (props) => {
  const dispatch = useDispatch();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/jpg, image/heic, image/png",
    maxFiles: 3,
  });
  const { onChangeHandler, array } = props;
  useEffect(() => {
    if(acceptedFiles.length === 0){
      return;
    }
    const newImages = acceptedFiles.map(items =>{
        return items.path;
    })
    dispatch(changePostActions.updateImages(newImages));
    onChangeHandler(acceptedFiles);
  }, [acceptedFiles, onChangeHandler, dispatch]);
  const files = acceptedFiles.map((file, index) => {
    return <img key={index} src={URL.createObjectURL(file)} alt="" />;
  });
  return (
    <>
      <section className={styles.drop}>
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <div className={styles.content}>
            <FontAwesomeIcon icon={faFileArchive} />
            <p>Nhấn hoặc kéo thả ảnh (tối đa 3 cho mỗi bài viết)</p>
            <p className={styles.notify}>
              Lưu ý: Ảnh sẽ thay thế toàn bộ ảnh cũ
            </p>
            <p className={styles.notify}>Định dạng ảnh: jpg, jpeg, heic, png</p>
          </div>
        </div>
      </section>
      <aside className={styles.images}>
        {acceptedFiles.length === 0
          ? props.array.map((items, index) => {
              return (
                <img
                  key={index}
                  src={require(`../../../../../img/images/${items}`).default}
                  alt=""
                />
              );
            })
          : files}
      </aside>
    </>
  );
};

export default Dropzone;
