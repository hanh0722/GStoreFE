import React from "react";
import styles from "./DownloadNotification.module.scss";
import { Button } from "@material-ui/core";
import p1 from "../../img/images/Appstore.png";
import p2 from "../../img/images/Andr.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../redux-store/Store";
import { createPortal } from "react-dom";
import OverlayPortals from "../Overlay/OverlayPortal";
const DownloadNotification = ({ data }) => {
  const isDownloaded = useSelector((state) => state.layout.isDownloaded);
  
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(layoutActions.toggleDownload());
  };
  return (
    <>
      <div
        className={`${styles.notification} ${
          isDownloaded && styles["toggle_blocked"]
        }`}
      >
        <p>
          Cách 1: Truy cập <span>{data === 0 ? "Appstore" : "CH-Play"}</span>
        </p>
        <div className={`${styles.button} ${data === 1 && styles['btn-1']}`}>
          <a
            href={
              data === 0
                ? "https://apps.apple.com/vn/app/g-store/id1537350489"
                : "https://play.google.com/store/apps/details?id=com.company.gstore_app"
            }
          >
            <Button variant="outlined">
              <FontAwesomeIcon icon={data === 0 ? faApple : faAndroid} />
              {data === 0 ? "Appstore" : "CH-Play"}
            </Button>
          </a>
        </div>

        <p>Cách 2: Quét QR code</p>
        <div className={styles.img}>
          <img src={data === 0 ? p1 : p2} alt="" />
        </div>
        <div className={`${styles.closed}`}>
            <Button onClick={toggleHandler} variant='contained'>X</Button>
        </div>
      </div>
      {isDownloaded &&
        createPortal(
          <OverlayPortals layout={toggleHandler} />,
          document.getElementById("overlay")
        )}
    </>
  );
};

export default DownloadNotification;
