import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FormPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const Files = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    accept: "image/jpeg, image/jpg, image/heic, image/png",
  });
  const {gettingFiles} = props;
  useEffect(() =>{
    gettingFiles(acceptedFiles)
  }, [acceptedFiles, gettingFiles]);
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <img src={URL.createObjectURL(file)} alt=''/>
    </li>
  ));
  return (
    <section className={styles.section}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.row}>
          <p className={styles.icon}>
            <FontAwesomeIcon icon={faUpload} />
          </p>
          <p className={styles.text}>
            Nhấn hoặc kéo thả ảnh (Lưu ý: 3 ảnh khác nhau cho mỗi bài viết và ảnh thay thế
            toàn bộ ảnh cũ)
            <br />
            Chấp nhận ảnh: jpeg, jpg, heic, png
          </p>
        </div>
      </div>
      <aside>
        <ul className={styles.list}>{files}</ul>
      </aside>
    </section>
  );
};

export default React.memo(Files);
