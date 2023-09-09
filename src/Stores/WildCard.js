import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip, message } from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { AddToWishlist, requestPricer, requestSearch } from "../api";
import SocialModal from "../SharePopup";
import { useMediaQuery } from "../utils";

const WildCardStore = ({ term, store,openConverter, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  useEffect(() => {
    term?.value && term.sessionId && getResults(term);
  }, [term?.value]);

  
    const isSmall = useMediaQuery("(max-width: 780px)");

    const gridStyle = {
      width: isSmall ? "50%" : "33.33333%",
      textAlign: "center",
      height: "150px",
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
      style={{ height: "350px", marginTop: "5px", overflow: "auto" }}
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
      title={`Prices from 100+ stores`}
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
            <div
              href={r?.url}
              style={{
                fontSize: "1px",
                padding: "0px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontSize: "10px",
                  display: "flex",
                  padding: "0 10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                 <Tooltip title={r.title}>
                  <p
                  style={{
                    width: "90%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    width: "60%",
                    textOverflow: "ellipsis",
                    cursor:"pointer"
                  }}
                >
                  {r.title}
                </p>
                </Tooltip>
                <Tooltip title="Share with friends!">
                  <ShareAltOutlined onClick={() => setOpenSocial(true)} />
                </Tooltip>
              </div>
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
                      style={{
                        height: "100px",
                        margin: "0 auto",
                        width: "100px",
                      }}
                      src={r?.img ? r?.img : "/empty_cart.jpeg"}
                    />
                  </a>
                  {result && (
                    <div
                      style={{
                        width: "100%",
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
