import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { deleteWishlist, getWishlist } from "../api";

const WishListModal = ({ openCart, setOpenCart, user }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    user && fetchWishlist();
  }, [openCart]);

  console.log(user);

  const fetchWishlist = () => {
    getWishlist(user._id,user.token).then((res) => {
      console.log(res.data.data);
      setWishlist(res.data.data);
    });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenCart(false);
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="WishList"
        open={openCart}
        style={{
          top: 20,
          height: "550px",
          overflowX: "hidden",
          overflowY: "auto",
        }}
        width={350}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space style={{ width: "100%" }} direction="vertical">
          {wishlist.length > 0 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5>Items in Your Wishlist</h5>
                <Button
                  style={{ height: "30px" }}
                  onClick={() => fetchWishlist()}
                >
                  Refresh
                </Button>
              </div>
              {wishlist.map((w, i) => {
                return (
                  <div
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      alignItems: "baseline",
                    }}
                  >
                    <div style={{ width: "250px" }}>
                      <a href={w?.url} target="_blank">
                        <p style={{ margin: 0 }}>{w.store}</p>

                        <img
                          alt="example"
                          style={{ height: "50px", width: "50px" }}
                          src={w.image ? w.image : "/empty_cart.jpeg"}
                        />
                      </a>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          width: "280px",
                        }}
                      >
                        <p
                          style={{
                            padding: 0,
                            marginBottom: 0,
                            maxWidth: "250px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {w.name}
                        </p>{" "}
                        <DeleteOutlined
                          onClick={() => {
                            deleteWishlist(user._id, w._id).then((res) => {
                              fetchWishlist();
                            });
                          }}
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <h6>{w.price}</h6>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                width: "280px",
              }}
            >
              <p>Your cart is empty! </p>
              <ReloadOutlined onClick={() => fetchWishlist()} />
            </div>
          )}
        </Space>
      </Modal>
    </>
  );
};

export default WishListModal;
