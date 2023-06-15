import React, { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LoginModal from "./LoginModal";
const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
   const [open, setOpen] = useState(false);

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
        <div>
          <LoginOutlined onClick={() => setOpenLogin(true)} />{" "}
        </div>
        <ShoppingCartOutlined />
      </div>
    </div>
  );
};

export default Header;
