import React, { useState, useEffect } from "react";
import Store from "./Store";
import { Card } from "antd";
const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding:0
};
const Prices = ({ results }) => {
  return (
    <Card
      style={{ marginTop: "5px" }}
      title="Compare Prices From Different Stores!"
    >
     
      
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Store />
      </Card.Grid>
    </Card>
  );
};

export default Prices;
