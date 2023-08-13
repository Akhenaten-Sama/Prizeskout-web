/*global chrome*/
import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import { login, signUp } from "./api";

const LoginModal = ({ openLogin, setOpenLogin, setUser, }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleLogin = (details) => {
    try {
          setConfirmLoading(true);

      login(details)
        .then((res) => {
       
         localStorage.setItem("user", JSON.stringify(res.data.data) )
          setConfirmLoading(false);
          setOpenLogin(false)
          setUser(JSON.parse(localStorage.getItem("user")));
        })
        .catch((err) => {
          console.log(err.message);
          setConfirmLoading(false);

        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = (details) => {
        setConfirmLoading(true);
    signUp(details).then((res)=>{
      
localStorage.setItem(" user", JSON.stringify(res.data.data));
      setConfirmLoading(false);
      setOpenLogin(false);
         setUser(JSON.parse(localStorage.getItem("user")));
  }).catch(err=>{
    console.log(err)
  })
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenLogin(false);
  };

  return (
    <>
      <Modal
        title={state}
        open={openLogin}
        style={{
          top: 20,
          width: "400px",
        }}
        width={300}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
          loading={confirmLoading}
            onClick={() =>
              
              state == "login"
                ? handleLogin({ email, password })
                : handleSignUp({ name, email, password })
            }
          >
            Submit
          </Button>,
        ]}
      >
        {state == "login" ? (
          <Space direction="vertical">
            <Input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="please enter your email"
            />
            <Space direction="horizontal">
              <Input.Password
                type="text"
                name="password"
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
            <div
              style={{ fontSize: "12px", color: "red", cursor: "pointer" }}
              onClick={() => setState("register")}
            >
              Signup Instead
            </div>
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
              style={{ fontSize: "12px", color: "red", cursor: "pointer" }}
              onClick={() => setState("login")}
            >
              Login Instead
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
