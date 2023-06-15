import React from 'react'
import { Card } from "antd";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Store = () => {
  return (
    <div style={{ fontSize: "13px" }}>
      <p>Amazon</p>
      <img
        alt="example"
        style={{ height: "60px", width: "60px" }}
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
      <div style={{display:"flex", padding:"0 10px",justifyContent:'space-between'}}>
        <p>Price: $45</p>
        <p>
          <ShoppingCartOutlined size={15} />
        </p>
      </div>
    </div>
  );
}

export default Store