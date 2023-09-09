import { Input, Modal, Result,Button, Select, Space, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { convertAmount, currencySymbols } from "./api";
const symbols = [
  { value: "USD", label: "American Dollar" },
  { value: "NGN", label: "Nigerian Naira" },
  { value: "EUR", label: "Euro" },
  { value: "GHS", label: "Ghanaian Cedi" },
  { label: "British Pound ", value: "GBP" },
  { label: "Canadian Dollar ", value: "CAD" },
  { label: "Australian Dollar ", value: "AUD" },
  { label: "Japanese Yen ", value: "JPY" },
  { label: "Swiss Franc ", value: "CHF" },
  { label: "Chinese Yuan ", value: "CNY" },
  { label: "Swedish Krona ", value: "SEK" },
  { label: "New Zealand Dollar ", value: "NZD" },
  { label: "Mexican Peso", value: "MXN" },
  { label: "Singapore Dollar ", value: "SGD" },
  { label: "Hong Kong Dollar ", value: "HKD" },
  { label: "Norwegian Krone ", value: "NOK" },
  { label: "South Korean Won ", value: "KRW" },
  { label: "Turkish Lira ", value: "TRY" },
  { label: "Russian Ruble ", value: "RUB" },
  { label: "Indian Rupee ", value: "INR" },
  { label: "Brazilian Real ", value: "BRL" },
  { label: "South African Rand ", value: "ZAR" },
  { label: "Malaysian Ringgit ", value: "MYR" },
  { label: "Philippine Peso ", value: "PHP" },
  { label: "Indonesian Rupiah ", value: "IDR" },
  { label: "Thai Baht ", value: "THB" },
  { label: "Polish Zloty ", value: "PLN" },
  { label: "Israeli New Shekel ", value: "ILS" },
  { label: "Danish Krone ", value: "DKK" },
  { label: "Argentine Peso ", value: "ARS" },
  { label: "Saudi Riyal ", value: "SAR" },
  { label: "Taiwan Dollar ", value: "TWD" },
  { label: "Chilean Peso ", value: "CLP" },
  { label: "United Arab Emirates Dirham ", value: "AED" },
  { label: "Czech Koruna ", value: "(CZK" },
  { label: "Hungarian Forint ", value: "(HUF" },
  { label: "Colombian Peso ", value: "(COP" },
  { label: "Peruvian Sol ", value: "PEN" },
  { label: "Pakistani Rupee ", value: "PKR" },
  { label: "Bangladeshi Taka", value: " BDT" },
  { label: "Romanian Leu", value: " RON" },
  { label: "Egyptian Pound", value: "EGP" },
  { value: "KSH", label: "Kenyan shili" },
];

const Converter = ({ openConverter, setOpenConverter, user }) => {
  const [to, setTo] = useState("EUR");
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

  const getResult = (from, to, amount, user) => {
    setResultsLoading(true);
    convertAmount(from, to, amount, user.token)
      .then((res) => {
        if (res.status === 200) {
          setResultsLoading(false);
          setResult(res.data.data.new_amount);
        }
      })
      .catch((res) => {
        console.log(res.response.data.message);
        message.error(res?.response.data.message, 3);
        console.log(res);
      });
  };

  const handleOk = () => {
    getResult(from, to, amount, user);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setAmount(0);
    setResult(null);
    setOpenConverter(false);
  };

  console.log(resultsLoading);
  return (
    <div  className="sub-2">
      <p style={{ margin: 0, padding: 0, fontSize: "14px" }}>
        Currency Converter
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: "50px", fontSize: "12px" }}>Amount: </span>
        <Input
          style={{ minWidth: 200, marginLeft: "10px" }}
          type="number"
          onChange={(e) => handleChange("amount", e.target.value)}
          value={amount}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: "50px", fontSize: "12px" }}>From: </span>
        <Select
          defaultValue="USD"
          value={from}
          style={{ width:"100%", marginLeft: "10px" }}
          onChange={(e) => handleChange("from", e)}
          options={symbols}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: "50px", fontSize: "12px" }}>To: </span>
        <Select
          defaultValue="EUR"
          value={to}
          style={{ width: "100%", marginLeft: "10px" }}
          onChange={(e) => handleChange("to", e)}
          allowClear
          options={symbols}
        />
      </div>
      <div>
        <Button onClick={handleOk} > Convert</Button>
      </div>

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
    </div>
  );
};

export default Converter;