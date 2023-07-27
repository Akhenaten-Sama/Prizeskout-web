import React, { useState, useEffect } from "react";
import { Card, Spin, Tooltip} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { AddToWishlist, deleteWishlist, requestPingDuo } from "../api";

const PinDUoDuoStore = ({ term, store, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  console.log(result);
  const getResults = (term) => {
    setLoading(true);
    requestPingDuo(term)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setResult(res.data.items[0]);
          setLoading(false);
        }
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
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
  })}
  return (
    <div
      href={`https://item.jd.com/${result?.num_iid}.html`}
      target="_blank"
      style={{ fontSize: "13px" }}
    >
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
            src={result?.pic_url ? result?.pic_url : "/empty_cart.jpeg"}
          />
          {result && (
            <div
              style={{
                fontSize: "10px",
                display: "flex",
                padding: "0 10px",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px" }}>Price: {result?.price}</p>
              <Tooltip
                onClick={() =>
                  AddToMyWishlist(
                    `https://item.jd.com/${r?.num_iid}.html`,
                    r.price,
                    r.pic_url,
                    r.name,
                    store
                  )
                }
                title="Add to cart"
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
  );
};

export default PinDUoDuoStore;

