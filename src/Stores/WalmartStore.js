import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { requestWalmart } from "../api";

const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};
const WalMartStore = ({ term, store, setOpenConverter }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  const getResults = (term) => {
    setLoading(true);
    requestWalmart(term)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const result =
            res.data.item.props.pageProps.initialData.searchResult.itemStacks[0].items.slice(
              0,
              9
            );
          const modifiedRes = result.map((r) => {
            return {
              image: r.image,
              url: `https://walmart.com${r.canonicalUrl}`,
              price: r.price,
              name: r.name,
            };
          });
          setResult(modifiedRes);
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
      style={{ marginTop: "5px", flex: "initial" }}
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
                  <a href={r?.url} target="_blank">
                    <img
                      alt="example"
                      style={{ height: "60px", width: "60px" }}
                      src={r?.image ? r?.image : "/empty_cart.jpeg"}
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
                      <p style={{ fontSize: "10px" }}>Price:$ {r?.price}</p>
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
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default WalMartStore;
