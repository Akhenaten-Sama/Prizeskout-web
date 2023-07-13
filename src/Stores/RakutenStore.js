import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
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
import SocialModal from "../SharePopup";

const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const RakutenStore = ({ term, store, setOpenConverter }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [openSocial, setOpenSocial] = useState(false);
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
        <Tooltip title="Currency Converter" color="#f06821">
          <Button
            style={{ width: "85px" }}
            onClick={() => setOpenConverter(true)}
          >
            Converter
          </Button>
        </Tooltip>
      }
    >
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
        result?.map((r) => (
          <Card.Grid style={gridStyle}>
            <div style={{ fontSize: "13px" }}>
              <p style={{ marginLeft: "10px" }}>
                {store}{" "}
                <Tooltip title="Share with friends!">
                  <ShareAltOutlined onClick={() => setOpenSocial(true)} />
                </Tooltip>
              </p>
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
                  <a href={r?.Product.productUrlPC}>
                    <img
                      alt="example"
                      style={{ height: "60px", width: "60px" }}
                      src={
                        r?.Product.mediumImageUrl
                          ? r?.Product.mediumImageUrl
                          : "/empty_cart.jpeg"
                      }
                    />
                  </a>
                  {r && (
                    <div
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        padding: "0 10px",
                        justifyContent: "space-between",
                        alignItems:"center"
                      }}
                    >
                      <p style={{ fontSize: "12px" }}>
                        Price: {r?.Product.averagePrice}
                      </p>
                      <Tooltip title="Add to cart" color="#f06821">
                        <p>
                          <ShoppingCartOutlined size={14} />
                        </p>
                      </Tooltip>
                    </div>
                  )}
                </div>
              )}
            </div>
            <SocialModal
              url={r?.Product.productUrlPC}
              setOpenSocial={setOpenSocial}
              openSocial={openSocial}
            />
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default RakutenStore;
