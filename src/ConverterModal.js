import { Input, Modal, Result, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { convertAmount, currencySymbols } from "./api";
const symbols = [
  { value: "USD", label: "American Dollar" },
  { value: "NGN", label: "Nigerian Naira" },
  { value: "EUR", label: "Euro" },
  { value: "GHS", label: "Ghanaian Cedi" },
{label:"British Pound ", value:"GBP"},
{label:"Canadian Dollar ", value:"CAD"},
{label:"Australian Dollar ", value:"AUD"},
{label:"Japanese Yen ", value:"JPY"},
{label:"Swiss Franc ", value:"CHF"},
{label:"Chinese Yuan ", value:"CNY"},
{label:"Swedish Krona ", value:"SEK"},
{label:"New Zealand Dollar ", value:"NZD"},
{label:"Mexican Peso", value:"MXN"},
{label:"Singapore Dollar ", value:"SGD"},
{label:"Hong Kong Dollar ", value:"HKD"},
{label:"Norwegian Krone ", value:"NOK"},
{label:"South Korean Won ", value:"KRW"},
{label:"Turkish Lira ", value:"TRY"},
{label:"Russian Ruble ", value:"RUB"},
{label:"Indian Rupee ", value:"INR"},
{label:"Brazilian Real ", value:"BRL"},
{label:"South African Rand ", value:"ZAR"},
{label:"Malaysian Ringgit ", value:"MYR"},
{label:"Philippine Peso ", value:"PHP"},
{label:"Indonesian Rupiah ", value:"IDR"},
{label:"Thai Baht ", value:"THB"},
{label:"Polish Zloty ", value:"PLN"},
{label:"Israeli New Shekel ", value:"ILS"},
{label:"Danish Krone ", value:"DKK"},
{label:"Argentine Peso ", value:"ARS"},
{label:"Saudi Riyal ", value:"SAR"},
{label:"Taiwan Dollar ", value:"TWD"},
{label:"Chilean Peso ", value:"CLP"},
{label:"United Arab Emirates Dirham ", value:"AED"},
{label:"Czech Koruna ", value:"(CZK"},
{label:"Hungarian Forint ", value:"(HUF"},
{label:"Colombian Peso ", value:"(COP"},
{label:"Peruvian Sol ", value:"PEN"},
{label:"Pakistani Rupee ", value:"PKR"},
{label:"Bangladeshi Taka", value:" BDT"},
{label:"Romanian Leu", value:" RON"},
{label:"Egyptian Pound", value:"EGP"},
{value:"KSH", label:"Kenyan shili"}
];

const ConverterModal = ({ openConverter, setOpenConverter }) => {
  const [to, setTo] = useState("NGN");
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  const handleChange = (type, value) => {
    console.log(type, value);
    if (type == "to") {
      setTo(value);
    } else if (type == "from") {
      setFrom(value);
    } else {
      setAmount(value);
    }
  };

  const getResult = (from, to, amount) => {
      setResultsLoading(true);
    convertAmount(from, to, amount)
      .then((res) => {
      
        if (res.status === 200) {
          setResultsLoading(false);
          setResult(res.data.new_amount);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleOk = () => {
    getResult(from, to, amount);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setAmount(0);
    setResult(null);
    setOpenConverter(false);
  };

  console.log(resultsLoading);
  return (
    <div>
      <Modal
        open={openConverter}
        title="Currency Converter"
        style={{
          width: "400px",
        }}
        width={300}
        onOk={handleOk}
        //confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Amount: </span>
            <Input
              style={{ width: 180 }}
              type="number"
              onChange={(e) => handleChange("amount", e.target.value)}
              value={amount}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>From: </span>
            <Select
              defaultValue="USD"
              value={from}
              style={{ width: 180 }}
              onChange={(e) => handleChange("from", e)}
              options={symbols}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>To: </span>
            <Select
              defaultValue="NGN"
              value={to}
              style={{ width: 180 }}
              onChange={(e) => handleChange("to", e)}
              allowClear
              options={symbols}
            />
          </div>
        </Space>

        {result && !resultsLoading ? (
          <div
            style={{ marginTop: "30px", fontSize: "13px", textAlign: "center" }}
          >
            <b>{`${from} ${amount.toLocaleString()} is ${to} ${result.toLocaleString()}`}</b>
          </div>
        ) : resultsLoading ? (
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
        ) : null}
      </Modal>
    </div>
  );
};

export default ConverterModal;
