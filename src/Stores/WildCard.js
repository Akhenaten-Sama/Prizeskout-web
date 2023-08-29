import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip, message } from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { AddToWishlist, requestPricer, requestSearch } from "../api";
import SocialModal from "../SharePopup";

const WildCardStore = ({ term, store,openConverter, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  useEffect(() => {
    term?.value && term.sessionId && getResults(term);
  }, [term?.value]);
  const gridStyle = {
    width: "33.33333%",
    textAlign: "center",
    height: "180px",
    padding: 0,
  };

  const AddToMyWishlist = (url, price, image, name, store) => {
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
  };

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestSearch(term.value, user._id, store, term.sessionId, user.token)
      .then((res) => {
        
        if (res.status === 200) {
            if (res.data.error) {
              message.error(res.data.details);
               setLoading(false);
              return
            }
          console.log(res.data);
          const responses = res.data.data.filter(
            (r) => r.shop !== " from eBay"
          );
          setResult(responses.slice(0, 100));
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

  return (
    <Card
      style={{ marginTop: "5px" }}
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
                {r.shop}{" "}
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
                  <a href={r?.link} target="_blank">
                    {" "}
                    <img
                      alt="example"
                      style={{ height: "60px", width: "60px" }}
                      src={r?.img ? r?.img : "/empty_cart.jpeg"}
                    />
                  </a>
                  {result && (
                    <div
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        padding: "0 10px",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "12px" }}>Price: {r?.price}</p>
                      <Tooltip
                        onClick={() =>
                          AddToMyWishlist(
                            r.link,
                            r.price,
                            r.img,
                            r.title,
                            r.shop
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
              url={r?.link}
              setOpenSocial={setOpenSocial}
              openSocial={openSocial}
            />
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default WildCardStore;
