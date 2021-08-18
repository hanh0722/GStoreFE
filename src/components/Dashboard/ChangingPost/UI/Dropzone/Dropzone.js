import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Dropzone = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/jpg, image/heic, image/png",
    maxFiles: 3,
  });
  const {uploadNewImages} = props;
  useEffect(() => {
    if(acceptedFiles.length === 0){
      return;
    }
    uploadNewImages(acceptedFiles)
  }, [acceptedFiles, uploadNewImages]);

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
            <p>Nhấn hoặc kéo thả ảnh (Lưu ý: 3 ảnh cho mỗi bài viết)</p>
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
