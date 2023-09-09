import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Tooltip, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import {
  AddToWishlist,
  deleteWishlist,
  requestEbayNew,
  requestSearch,

} from "../api";
import SocialModal from "../SharePopup";
import ConverterModal from "../Modals/ConverterModal";
import { useMediaQuery } from "../utils";


const EbayStore = ({ term, store, openConverter, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  useEffect(() => {
    term?.value && term.sessionId && getResults(term);
  }, [term?.value]);


  const isSmall = useMediaQuery("(max-width: 780px)");
  console.log(isSmall);
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
            message.error(res.data.details);
            setLoading(false);
            return;
          }
          console.log(res.data);
          setResult(res.data.data.products.slice(0, 30));
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error(
          `search for ${term.value} failed ${
            err?.response?.data ? err?.response.data.details : ""
          }`
        );
        setLoading(false);
      });
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
  return (
    <Card
      style={{  height:"350px",marginTop: "5px", overflow: "auto" }}
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
                <p style={{ fontSize: "13px" }}>{`${term.value} from Ebay`}</p>
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
                  <a href={r?.url} target="_blank">
                    <img
                      alt="example"
                      style={{
                        height: "100px",
                        margin: "0 auto",
                        width: "100px",
                      }}
                      src={r?.thumbnail ? r?.thumbnail : "/empty_cart.jpeg"}
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
                        Price: {r?.price.currency}
                        {r?.price.value}
                      </p>
                      <Tooltip
                        onClick={() =>
                          AddToMyWishlist(
                            r.url,
                            `$${r.price.value}`,
                            r.thumbnail,
                            r.title,
                            store
                          )
                        }
                        title="Add to cart"
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
              url={r?.url}
              setOpenSocial={setOpenSocial}
              openSocial={openSocial}
            />
          </Card.Grid>
        ))
      )}
      <ConverterModal
        user={user}
        openConverter={openConverter}
        setOpenConverter={setOpenConverter}
      />
    </Card>
  );
};

export default EbayStore;
