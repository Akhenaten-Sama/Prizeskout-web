import React, { useState, useEffect } from "react";
import { Card, Tabs } from "antd";
import RakutenStore from "./Stores/RakutenStore";
import EbayStore from "./Stores/EbayStore";
import AliexpressStore from "./Stores/AliexpressStore";
import JingDongStore from "./Stores/JingDongStore";
import PinDUoDuoStore from "./Stores/PingDuoDo";
import AlibabaStore from "./Stores/AlibabaStore";
//import IdealoStore from "./Stores/IdealoStore";
import WalMartStore from "./Stores/WalmartStore";
import WildCardStore from "./Stores/WildCard";
import AmazonStore from "./Stores/AmazonStore";
const stores = [
  "Ebay",
  "Walmart",
  "Aliexpress",
  "Amazon",
  "WildCard",
  "Rakuten",
  "Jingdong",
];
const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const Prices = ({ result, setOpenConverter, user }) => {
  const getStore = (id) => {
    switch (id) {
      case "Alibaba":
        return (
          <AlibabaStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
            user={user}
          />
        );

      case "Walmart":
        return (
          <WalMartStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
            user={user}
          />
        );
      case "WildCard":
        return (
          <WildCardStore
            user={user}
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );

      case "Aliexpress":
        return (
          <AliexpressStore
            user={user}
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );

      case "Amazon":
        return (
          <AmazonStore
            user={user}
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );

      case "Rakuten":
        return (
          <RakutenStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
            user={user}
          />
        );

      case "Jingdong":
        return (
          <JingDongStore
            user={user}
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );

      case "Ebay":
        return (
          <EbayStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
            user={user}
          />
        );
    }
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="12"
        tabPosition={"top"}
        style={{
          color: "white",
          height: 220,
        }}
        items={stores.map((s, i) => {
          const id = String(i);
          return {
            label: `${s}`,
            key: id,
            disabled: i === 28,
            children: getStore(s),
          };
        })}
      />
    </div>
  );
};

export default Prices;
