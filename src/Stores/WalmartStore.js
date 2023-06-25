import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  checkJob,
  getSearchResults,
  requestAmazon,
  requestEbay,
  requestGoogle,
  requestIdealo,
  requestPriceRunner,
} from "./api";

const IdealoStore = ({ term, store }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    term && getResults(term);
  }, [term]);

  const checkandFetch = async (jobId) => {
    setLoading(true);
    const ready = await checkJob(jobId);
    if (ready.data.status === "finished") {
      const result = await getSearchResults(jobId);
      const data = await result.data.results;
      console.log(data[0]);
      console.log(data[0]?.content?.search_results[0]);
      setResult(data[0]?.content?.search_results[0]);
      setLoading(false);
      return data[0];
    } else if (ready.data.status !== "finished") {
      setTimeout(async () => {
        return await checkandFetch(jobId);
      }, 5000);
    }
  };
  console.log(result);
  const getResults = async (term) => {
    
    
        try {
          const req = await requestEbay(term);
          await checkandFetch(req.data.job_id);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
  };

  return (
    <a href={result?.url} style={{ fontSize: "13px" }}>
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
            src={result?.image_url ? result?.image_url : "/empty_cart.jpeg"}
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
              <p style={{ fontSize: "12px" }}>Price: {result?.min_price}</p>
              <p>
                <ShoppingCartOutlined size={12} />
              </p>
            </div>
          )}
        </div>
      )}
    </a>
  );
};

export default IdealoStore;
