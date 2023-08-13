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
            quote={`I found this product using https://www.prizeskout.com/  check it out here ${url}`}
            url="https://prizeskout.com"
          >
            <FacebookIcon size={22} round />
          </FacebookShareButton>
          <LinkedinShareButton
            summary={`I found this product using https://www.prizeskout.com/  check it out here ${url}`}
            title="Prizeskout"
            url="https://prizeskout.com"
            source={url}
          >
            <LinkedinIcon size={22} round hashtag="#muo" />
          </LinkedinShareButton>
          <TwitterShareButton
            url={`I found this product using https://www.prizeskout.com/ use prizeskout today! check it out here ${url}`}
            quote="A goat can never be a lion"
          >
            <TwitterIcon size={22} round hashtag="#muo" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`I found this product using https://www.prizeskout.com/  check it out here ${url}`}
            quote="Prizeskout"
          >
            <WhatsappIcon size={22} round hashtag="#muo" />
          </WhatsappShareButton>
          <TelegramShareButton
            url={`I found this product using https://www.prizeskout.com/  check it out here ${url}`}
            quote="Prizeskout"
          >
            <TelegramIcon size={22} round />
          </TelegramShareButton>
        </Space>
      </Modal>
    </>
  );
};

export default SocialModal;
