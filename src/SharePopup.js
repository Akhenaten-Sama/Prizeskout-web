import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import {
  FacebookShareButton,
  HatenaShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,

} from "react-share";

const SocialModal = ({ openSocial, setOpenSocial, url }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [social, setSocial] = useState([]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenSocial(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenSocial(false);
  };

  return (
    <>
      <Modal
        title="WishList"
        open={openSocial}
        style={{
          top: 20,
          width: "400px",
        }}
        width={300}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          {wishlist.length > 0 ? (
            <div>WishList Components</div>
          ) : (
            <div>Your cart is empty!</div>
          )}
        </Space>
      </Modal>
    </>
  );
};

export default SocialModal;
