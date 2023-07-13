import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  TumblrIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const socials = [
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
];

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
        <div style={{ marginBottom: "20px" }}>Share this product!!</div>
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
          direction="vertical"
        >
          <FacebookShareButton
            quote={`This product was found using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            url="https://prizeskout.com"
           
          >
            <FacebookIcon size={22} round />
          </FacebookShareButton>
          <LinkedinShareButton
            summary={`This product was found using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            title="A goat can never be a lion"
            url="https://prizeskout.com"
            source="https://nairaland.com"
          >
            <LinkedinIcon size={22} round hashtag="#muo" />
          </LinkedinShareButton>
          <TwitterShareButton
            url={`This product was found using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            quote="A goat can never be a lion"
          >
            <TwitterIcon size={22} round hashtag="#muo" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`This product was found using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            quote="A goat can never be a lion"
          >
            <WhatsappIcon size={22} round hashtag="#muo" />
          </WhatsappShareButton>
          <TelegramShareButton
            url={`This product was found using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            quote="A goat can never be a lion"
          >
            <TelegramIcon size={22} round />
          </TelegramShareButton>
        </Space>
      </Modal>
    </>
  );
};

export default SocialModal;
