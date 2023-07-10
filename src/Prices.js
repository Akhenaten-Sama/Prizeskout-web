import React, { useState, useEffect } from "react";
import Store from "./Store";
import { Card, Tabs } from "antd";
import RakutenStore from "./Stores/RakutenStore";
import EbayStore from "./Stores/EbayStore";
import AliexpressStore from "./Stores/AliexpressStore";
import JingDongStore from "./Stores/JingDongStore";
import PinDUoDuoStore from "./Stores/PingDuoDo";
import AlibabaStore from "./Stores/AlibabaStore";
import IdealoStore from "./Stores/IdealoStore";
import WalMartStore from "./Stores/WalmartStore";
import AmazonStore from "./Stores/AmazonStore";
const stores = [
  "Amazon",
  "Ebay",
  "Alibaba",
  "Walmart",
  "Aliexpress",
  "Jingdong",
  "Bestbuy",
  "Rakuten",
  "Idealo",
];
const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const Prices = ({ result,setOpenConverter }) => {
  
  const getStore = (id) => {
    switch (id) {
      case "Alibaba":
       return (
         <AlibabaStore
           setOpenConverter={setOpenConverter}
           term={result}
           store={id}
         />
       );
      
      case "Walmart":
       return <WalMartStore   setOpenConverter={setOpenConverter}term={result} store={id} />;
     
      case "Aliexpress":
       return (
         <AliexpressStore
           setOpenConverter={setOpenConverter}
           term={result}
           store={id}
         />
       );
      
      case "Amazon":
        return (
          <AmazonStore
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
        />
      );
       
      case "Jingdong":
        return (
          <JingDongStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );
       
      case "Idealo":
        return (
          <IdealoStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );
       
      default:
        return (
          <EbayStore
            setOpenConverter={setOpenConverter}
            term={result}
            store={id}
          />
        );
    }
  };
  return (
    <div >
      <Tabs
        defaultActiveKey="1"
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
