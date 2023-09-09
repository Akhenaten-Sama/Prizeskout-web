import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip, message } from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
import {
  AddToWishlist,
  requestSearch,
} from "../api";
import SocialModal from "../SharePopup";
import { useMediaQuery } from "../utils";


const RakutenStore = ({ term, store,openConverter, setOpenConverter, user }) => {
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
      style={{ marginTop: "5px", overflow:"auto", }}
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
            <div
              href={r?.url}
              style={{
                fontSize: "12px",
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
                <p
                  style={{
                    width: "90%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    width: "60%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {r.Product.name}
                </p>
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
                  <a href={r?.Product.productUrlPC} target="_blank">
                    <img
                      alt="example"
                      style={{
                        height: "100px",
                        margin: "0 auto",
                        width: "100px",
                      }}
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
                        width: "100%",
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
