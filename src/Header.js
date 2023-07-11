import React, { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LoginModal from "./LoginModal";
import { Tooltip } from "antd";
import WishListModal from "./WishList";
const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        marginBottom: "5px",
      }}
    >
      <div>
        <img style={{ width: "50px" }} src="logoo.png" />
      </div>
      <div style={{ display: "flex" }}>
        <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} />
        <WishListModal setOpenCart={setOpenCart} openCart={openCart} />
        <div>
          <Tooltip placement="left" title="Login" color="#f06821">
            <LoginOutlined onClick={() => setOpenLogin(true)} />{" "}
          </Tooltip>
        </div>

        <Tooltip placement="left" title="Add To Cart" color="#f06821">
          <ShoppingCartOutlined onClick={() => setOpenCart(true)} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
