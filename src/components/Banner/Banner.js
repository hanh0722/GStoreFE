import React from "react";
import Layout from "../../layout/Layout/Layout";
import classes from "./Banner.module.scss";
import Line from "./Line/Line";
const content = [
  {
    title: "Mục tiêu mà G-STORE đang tạo ra là gì?",
    content:
      "Với mục tiêu: MINH BẠCH, NHIỆT HUYẾT, TẬN TÂM, AN TOÀN. G-Store sẽ là sự tập hợp, kết nối các nguồn lực toàn cầu nhằm mục đích xây dựng các sản phẩm, dịch vụ với nền tảng công nghệ 4.0 tạo ra lợi ích cho cộng đồng và xã hội",
  },
  {
    title: "Tầm nhìn của G-STORE là gì?",
    content:
      `Tầm nhìn: Trở thành công ty công nghệ nằm trong top khu vực châu Á trong 5 năm tới, với cốt lõi là giải pháp chia sẻ hàng hóa, dịch vụ trong xã hội, tạo kết nối cung và cầu sản phẩm, mặt hàng, dịch vụ trong lĩnh vực hàng hóa, dịch vụ thiết yếu thông qua nền tảng công nghệ 4.0. Khẳng định lại giá trị của nền kinh tế chia sẻ trong cộng đồng. Tạo ra nền tảng kết nối các giá trị đích thực và đặt giá trị cộng đồng lên ưu tiên cao nhất.`,
  },
  {
    title: "Làm thế nào để tham gia mua - bán trên G-STORE?",
    content:
      `Bước 1: Cập nhật ứng dụng G-Store phiên bản mới nhất trên kho ứng dụng Appstore & Google Play Bước 2: Đăng nhập vào tài khoản Bước 3: Nạp tiền vào ví G-Store bằng cách liên kết với ví Momo Bước 4: Khách hàng trải nghiệm Mua-bán trên sàn giao dịch G-Store.`,
  },
  {
    title: "Làm thế nào để trở thành đối tác bán hàng trên G-STORE?",
    content:
      "Hãy liên hệ ngay với chúng tôi để được tư vấn, giải đáp về quyền lợi và nghĩa vụ của đối tác.",
  },
];
const Banner = () => {
  return (
    <Layout className={classes.container}>
      <div data-aos='fade-in'>
        <h2>Về chúng tôi</h2>
        <p className={classes.title}>
          G-Store luôn nỗ lực hàng ngày nhằm mang lại những giá trị vượt bậc, sự
          tiện lợi, nhanh chóng cho mọi khách hàng, cộng đồng sử dụng ứng dụng
          G-Store
          <br /> ngay cả đến những khách hàng khó tính nhất.
        </p>
        <Layout className={classes["content-box"]}>
          {content.map((items, index) => {
            return (
              <Line key={index} title={items.title} content={items.content} />
            );
          })}
        </Layout>
      </div>
    </Layout>
  );
};

export default Banner;
