import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import { getWishlist } from "./api";

const WishListModal = ({ openCart, setOpenCart, user }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [wishlist, setWishlist] = useState([])
  
useEffect(()=>{
  user && fetchWishlist()
},[user])

console.log(user)
  

const fetchWishlist = ()=>{
  getWishlist(user._id).then((res) => {
    console.log(res.data.data);
    setWishlist(res.data.data);
  });
}
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          <Button onClick={()=>fetchWishlist()}>Refresh</Button>
          {wishlist.length>0?
          <div>WishList Components</div>
          
          :<div>Your cart is empty!</div>}
        </Space>
      </Modal>
    </>
  );
};

export default WishListModal;
