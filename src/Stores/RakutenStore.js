import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip, message } from "antd";
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
  AddToWishlist,
  requestSearch,
} from "../api";
import SocialModal from "../SharePopup";

const gridStyle = {
  width: "33.33333%",
  textAlign: "center",
  height: "150px",
  padding: 0,
};

const RakutenStore = ({ term, store, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [openSocial, setOpenSocial] = useState(false);
  useEffect(() => {
    term?.value && term.sessionId && getResults(term);
  }, [term?.value]);

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestSearch(term.value, user._id, store, term.sessionId, user.token)
      .then((res) => {
        if (res.status === 200) {
            if (res.data.error) {
               setLoading(false);
              message.error(res.data.details);
              return
            }
          console.log(res.data);
          setResult(res.data.data.Products.slice(0, 15));
          setLoading(false);
        }
           setLoading(false);
      })
      .catch((err) => {
        
          console.log(err.response.data.details);
          message.error(err?.response.data.details);
        setLoading(false);
        
      });
  };
  const AddToMyWishlist = (url,price,image,name, store,)=>{
  AddToWishlist({
    userId: user._id,
    url: url,
    price: price,
    image: image,
    store: store,
    name: name,
  })
    .then((res) => {
      message.success("added to wishlist");
    })
    .catch((err) => {
      message.error("error adding item to wishlist");
    });
  
  }
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
            Currency
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
                  <a href={r?.Product.productUrlPC} target="_blank">
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
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "12px" }}>
                        Price: JP¥{r?.Product.averagePrice}
                      </p>
                      <Tooltip
                        onClick={() =>
                          AddToMyWishlist(
                            r?.Product.productUrlPC,
                            `¥${r.Product.averagePrice}`,
                            r?.Product.mediumImageUrl,
                            r.Product.name,
                            store
                          )
                        }
                        title="Add to wishlist"
                        color="#f06821"
                      >
                        <p
                          style={{
                            cursor: "pointer",
                          }}
                        >
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
