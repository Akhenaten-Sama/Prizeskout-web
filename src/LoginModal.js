import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { EyeTwoTone } from "@ant-design/icons";


const LoginModal = ({openLogin, setOpenLogin}) => {
 
  const [confirmLoading, setConfirmLoading] = useState(false);
   const [passwordVisible, setPasswordVisible] = React.useState(false);

 

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenLogin(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenLogin(false);
  };

  return (
    <>
      <Modal
        title="Login"
        open={openLogin}
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
          <Input placeholder="please enter your email"/>
          <Space direction="horizontal">
            <Input.Password
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
        </Space>
      </Modal>
    </>
  );
};

export default LoginModal;
