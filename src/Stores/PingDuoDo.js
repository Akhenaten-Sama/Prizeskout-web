import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { requestPingDuo } from "../api";

const PinDUoDuoStore = ({ term, store }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestPingDuo(term)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setResult(res.data.items[0]);
          setLoading(false);
        }
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
      });
  };

  return (
    <a
      href={`https://item.jd.com/${result?.num_iid}.html`}
      target="_blank"
      style={{ fontSize: "13px" }}
    >
      <p>{store}</p>
      {loading ? (
        <div
          style={{
            margin: "20px 0",
            marginBottom: "20px",
            padding: "30px 50px",
            textAlign: "center",

            borderRadius: "4px",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div>
          <img
            alt="example"
            style={{ height: "60px", width: "60px" }}
            src={result?.pic_url ? result?.pic_url : "/empty_cart.jpeg"}
          />
          {result && (
            <div
              style={{
                fontSize: "10px",
                display: "flex",
                padding: "0 10px",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px" }}>Price: {result?.price}</p>
              <p>
                <ShoppingCartOutlined size={12} />
              </p>
            </div>
          )}
        </div>
      )}
    </a>
  );
};

export default PinDUoDuoStore;

