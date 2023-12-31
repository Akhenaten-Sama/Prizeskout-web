import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { AddToWishlist } from "../api";
// import {
//   checkJob,
//   getSearchResults,
//   requestAmazon,
//   requestEbay,
//   requestGoogle,
//   requestIdealo,
//   requestPriceRunner,
// } from "../api";

const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};
const AlibabaStore = ({ term, store,openConverter, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [term]);

  const AddToMyWishlist = (url, price, image, name, store) => {
    AddToWishlist({
      userId: user._id,
      url: url,
      price: price,
      image: image,
      store: store,
      name: name,
    });
  };
  return (
    <Card
      style={{ marginTop: "5px", overflow: "auto" }}
      extra={
        <Tooltip title="Currency Converter" color="#f06821">
          <Button
            style={{ width: "85px" }}
            onClick={() => setOpenConverter(true)}
          >
            Currency
          </Button>
        </Tooltip>
      }
      title={<div style={{ flex: "initial" }}>{store} Prices!</div>}
    >
      {result?.map((r) => (
        <Card.Grid style={gridStyle}>
          <div href={result?.url} style={{ fontSize: "13px" }}>
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
                <a href={result?.url} target="_blank">
                  <img
                    alt="example"
                    style={{ height: "60px", width: "60px" }}
                    src={
                      result?.image_url ? result?.image_url : "/empty_cart.jpeg"
                    }
                  />
                </a>
                {result && (
                  <div
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      padding: "0 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: "12px" }}>
                      Price: {result?.min_price}
                    </p>
                    <Tooltip
                      onClick={() =>
                        AddToMyWishlist(
                          result.url,
                          result.min_price,
                          result.image_url,
                          result.name,
                          store
                        )
                      }
                      title="Add to wishlist"
                      color="#f06821"
                    >
                      <p>
                        <ShoppingCartOutlined size={14} />
                      </p>
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default AlibabaStore;
