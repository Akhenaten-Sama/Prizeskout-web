/*global chrome*/
import React, { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import LoginModal from "./Modals/LoginModal";
import { Tooltip } from "antd";
import WishListModal from "./Modals/WishList";
import SubscriptionModal from "./Modals/SubsriptionsModal";
import Navbar from "./Navbar";
import { redirect } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSub, setOpenSub] = useState(false);

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
      
      
      <div style={{ display: "flex" }}>
        <LoginModal
          setUser={setUser}
          setOpenLogin={setOpenLogin}
          openLogin={openLogin}
        />
        <WishListModal
          setOpenCart={setOpenCart}
          user={user}
          openCart={openCart}
        />
        <SubscriptionModal
          setOpenSub={setOpenSub}
          user={user}
          openSub={openSub}
        />
        <div style={{ display: "flex" }}>
          {!user ? (
            <Tooltip placement="left" title="Login" color="#f06821">
              <LoginOutlined onClick={() => setOpenLogin(true)} />{" "}
            </Tooltip>
          ) : (
            <div
              style={{
                display: "flex",
                width: "80px",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Tooltip placement="left" title="Subscriptions" color="#f06821">
                <PayCircleOutlined onClick={() => setOpenSub(true)} />
              </Tooltip>
              <Tooltip placement="left" title="Wishlist" color="#f06821">
                <ShoppingCartOutlined onClick={() => setOpenCart(true)} />
              </Tooltip>
              <Tooltip
              style={{cursor:"pointer"}}
                placement="left"
                title=" Click here to signout"
                color="#f06821"
              >
                <LogoutOutlined
                  onClick={() =>{
                  localStorage.setItem( 'user', null )
                  setUser(null)
                 return redirect("/");
                }
                  
                  }
                />{" "}
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
