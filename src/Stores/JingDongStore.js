import React, { useState, useEffect } from "react";
import { Card, Spin, Button,Tooltip, message } from "antd";
import { ShoppingCartOutlined,ShareAltOutlined } from "@ant-design/icons";
import { AddToWishlist, deleteWishlist, requestJingDong, requestSearch } from "../api";
import SocialModal from "../SharePopup";
import { useMediaQuery } from "../utils";


const JingDongStore = ({ term, store,openConverter, setOpenConverter, user }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [openSocial, setOpenSocial] = useState(false);
  useEffect(() => {
    term?.value && term.sessionId && getResults(term);
  }, [term?.value]);
const isSmall = useMediaQuery("(max-width: 700px)");
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
              return
            }
           console.log(res.data);
           setResult(res.data.data.items.slice(0, 30));
          
         }
            setLoading(false);
       })
       .catch(err => {

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
                <Tooltip title={r.title}>
                  <p
                    style={{
                      width: "90%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      width: "50%",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
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
                  <a
                    href={`https://item.jd.com/${r?.num_iid}.html`}
                    target="_blank"
                  >
                    <img
                      alt="example"
                      style={{
                        height: "100px",
                        margin: "0 auto",
                        width: "100px",
                      }}
                      src={r?.pic_url ? r?.pic_url : "/empty_cart.jpeg"}
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
                      <p style={{ fontSize: "12px" }}>Price:CN¥ {r?.price}</p>
                      <Tooltip
                        onClick={() =>
                          AddToMyWishlist(
                            `https://item.jd.com/${r?.num_iid}.html`,
                            `¥${r.price}`,
                            r.pic_url,
                            r.title,
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
              url={`https://item.jd.com/${r?.num_iid}.html`}
              setOpenSocial={setOpenSocial}
              openSocial={openSocial}
            />
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default JingDongStore;
