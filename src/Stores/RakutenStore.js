import React, { useState, useEffect } from "react";
import { Card, Spin, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  checkJob,
  getSearchResults,
  requestAmazon,
  requestEbay,
  requestRakuten,
  requestGoogle,
  requestIdealo,
  requestPriceRunner,
} from "../api";

const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const RakutenStore = ({ term, store, setOpenConverter }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestRakuten(term)
      .then((res) => {
        if (res.status === 200) {
            console.log(res.data);
          setResult(res.data.Products.slice(0, 8));
          setLoading(false);
        }
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
      });
  };

  return (
    <Card
      style={{ marginTop: "5px" }}
      title={`${store} Prices!`}
      extra={
        <Button
          style={{ width: "85px",  }}
          onClick={() => setOpenConverter(true)}
        >
           Converter
        </Button>
      }
    >
      {result?.map((r) => (
        <Card.Grid style={gridStyle}>
          <a href={r?.Product.productUrlPC} style={{ fontSize: "13px" }}>
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
                  src={
                    r?.Product.mediumImageUrl
                      ? r?.Product.mediumImageUrl
                      : "/empty_cart.jpeg"
                  }
                />
                {r && (
                  <div
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      padding: "0 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: "12px" }}>
                      Price: {r?.Product.averagePrice}
                    </p>
                    <p>
                      <ShoppingCartOutlined size={12} />
                    </p>
                  </div>
                )}
              </div>
            )}
          </a>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default RakutenStore;
