import { Button } from "antd";
import React from "react";

const PriceCard = ({ amount, setAmount, setMode, current, name, limit }) => {
  const handleSubscribe = () => {
    setAmount(amount);
    setMode("checkout");
  };
  return (
    <div>
      <p>{name}</p>
      <p>{limit}</p>
      <p>{amount}</p>
      {!current && <Button onClick={handleSubscribe}>subscribe</Button>}
    </div>
  );
};

export default PriceCard;
