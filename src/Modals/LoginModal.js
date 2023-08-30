/*global chrome*/
import React, { useState } from "react";
import { Button, Modal, Input, Space, message } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import { forgotPassword, login, signUp } from "../api";
import { redirect, useNavigate } from "react-router-dom";

const LoginModal = ({ openLogin, setOpenLogin, setUser }) => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [openForget, setOpenForget] = useState(false);

  const handleForget = (email) => {
    forgotPassword({ email })
      .then((res) => {
        message.success("Password link has been sent to your mail");
        setOpenForget(false);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const navigate = useNavigate()
  const handleLogin = (details) => {
    try {
      setConfirmLoading(true);

      login(details)
        .then((res) => {
          //localStorage.setItem("user", res.data.data);
          //console.log(res.data.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          const user = localStorage.getItem("user")
         // console.log(user);
          setUser(JSON.parse(user));
          setConfirmLoading(false);
          navigate("/")
        })
        .catch((err) => {
          setConfirmLoading(false);
          console.log(err);
          message.error(err?.response?.data.message);
          setConfirmLoading(false);
        });
    } catch (error) {
      console.log(error)
    }
  };

  const handleSignUp = (details) => {
    if (password !== confirmPassword) {
      message.info("Password does not match");
      return;
    }
    setConfirmLoading(true);
    signUp(details)
      .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          const user = localStorage.getItem("user");
          // console.log(user);
          setUser(JSON.parse(user));
          setConfirmLoading(false);
        setConfirmLoading(false);
       
      })
      .catch((err) => {
        setConfirmLoading(false);
        console.log(err.response.data.message);
        message.error(err?.response.data.message);
        console.log(err);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
   
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px",
          textAlign: "center",
        }}
      >
        {state == "Login" ? (
          <Space direction="vertical">
            <Input
              type="text"
              size="large"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="please enter your email"
            />
            <Space direction="horizontal">
              <Input.Password
                type="text"
                name="password"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="input password"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
              <Button
                style={{
                  width: 80,
                }}
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </Button>
            </Space>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: "#f06821",
                  cursor: "pointer",
                  marginRight: "12px",
                }}
                onClick={() => setState("Register")}
              >
                SignUp Instead
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#f06821",
                  cursor: "pointer",
                }}
                onClick={() => setOpenForget(true)}
              >
                Forgot Password?
              </div>
            </div>
            {openForget && (
              <div style={{ marginRight: "5px" }}>
                <p>Please enter your email</p>
                <Input
                  onChange={(e) => setForgotEmail(e.target.value)}
                  value={forgotEmail}
                  placeholder="please enter your email"
                />
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <Button onClick={() => handleForget(forgotEmail)}>
                    Send mail
                  </Button>
                  <Button onClick={() => setOpenForget(false)}>Close</Button>
                </div>
              </div>
            )}
          </Space>
        ) : (
          <Space direction="vertical">
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="please enter your name"
              value={name}
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="please enter your email"
            />
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              placeholder="input password"
              value={password}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
            <Input.Password
              placeholder="re enter your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
            <div
              style={{ fontSize: "14px", color: "#f06821", cursor: "pointer" }}
              onClick={() => setState("Login")}
            >
              Login Instead
            </div>
          </Space>
        )}
        <Button
          disabled={openForget}
          loading={confirmLoading}
          onClick={() =>
            state == "Login"
              ? handleLogin({ email, password })
              : handleSignUp({ name, email, password })
          }
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default LoginModal;
