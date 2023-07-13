import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { requestAmazon, requestEbayNew } from "../api";
import {ShareAltOutlined} from "@ant-design/icons"
import SocialModal from "../SharePopup";
const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const AmazonStore = ({ term, store, setOpenConverter }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [openSocial, setOpenSocial] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestAmazon(term)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setResult(res.data.results.slice(0, 8));
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
      title={`${store} Prices!`}
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
                  <a
                    target="_blank"
                    href={`https://amazon.com/${r.title}/dp/${r.asin}`}
                  >
                    <img
                      alt="example"
                      style={{ height: "60px", width: "60px" }}
                      src={r?.images ? r?.images[2].image : "/empty_cart.jpeg"}
                    />
                  </a>

                  {r && (
                    <div
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        padding: "0 10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ fontSize: "10px" }}>
                        Price:$ ${r?.price?.amount}
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
              url={`https://amazon.com/${r.title}/dp/${r.asin}`}
              setOpenSocial={setOpenSocial}
              openSocial={openSocial}
            />
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default AmazonStore;
