import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";

const WishListModal = ({ openCart, setOpenCart }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [wishlist, setWishlist] = useState([])
  

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenCart(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenCart(false);
  };

  return (
    <>
      <Modal
        title="WishList"
        open={openCart}
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
          
          {wishlist.length>0?
          <div>WishList Components</div>
          
          :<div>Your cart is empty!</div>}
        </Space>
      </Modal>
    </>
  );
};

export default WishListModal;
