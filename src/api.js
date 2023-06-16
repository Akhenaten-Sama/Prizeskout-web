import axios from "axios"

const currencyBaseUrl = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency`;
const compareBaseUrl = `https://api.priceapi.com/v2`;
const compareApikey =
  "QFDNYRKIOLFFJWEESINECUQZEUSEMNNVYXBFQMTSHFMVDIVNSOJQQMLTOWFJUOJX";
// export const currencyAxiosInstance = axios.create({
//   baseURL: `${currencyBaseUrl}/symbols/?access_key=/${process.env.REACT_APP_API_KEY}`,
 
// });
const config = {
  headers: {
    "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
    "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
  },
};

const data = {
  source: "amazon",
  country: "us",
  topic: "search_results",
  key: "term",
  values: "iPhone 6S",
  max_pages: "3",
  max_age: "1440",
  timeout: "5",
};

const priceConfig = {
  headers :{
  "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"

  }
}

export const requestAmazon = (term)=>{
    data.values=term
    return axios.post(`${compareBaseUrl}/jobs/?token=${compareApikey}`, data,priceConfig);
}

export const requestEbay = (term) => {
  data.values = term;
  data.source="ebay"
  return axios.post(
    `${compareBaseUrl}/jobs/?token=${compareApikey}`,
    data,
    priceConfig
  );
};

export const requestGoogle = (term) => {
  data.term = term;
  data.source = "google shopping";
  return axios.post(
    `${compareBaseUrl}/jobs/?token=${compareApikey}`,
    data,
    priceConfig
  );
};
export const requestIdealo = (term) => {
  data.term = term;
  data.source = "idealo";
  data.country="gb"
  return axios.post(
    `${compareBaseUrl}/jobs/?token=${compareApikey}`,
    data,
    priceConfig
  );
};

export const requestPriceRunner = (term) => {
  data.term = term;
  data.source = "pricerunner";
  data.country = "gb";
  return axios.post(
    `${compareBaseUrl}/jobs/?token=${compareApikey}`,
    data,
    priceConfig
  );
};

// export const requestIdealo = (term) => {
//   data.term = term;
//   data.source = "idealo";
//   data.country = "gb";
//   return axios.post(`${compareBaseUrl}/jobs/?token=${compareApikey}`, data);
// };
export const getSearchResults = (jobId) =>{
    return axios.get(`${compareBaseUrl}/jobs/${jobId}/download?token=${compareApikey}`)
}

export const checkJob = (jobId) =>{
    return axios.get(`${compareBaseUrl}/jobs/${jobId}?token=${compareApikey}`);
}
export const convertAmount = (from, to, amount) => {
  return axios.get(
    `${currencyBaseUrl}?&have=${from}&want=${to}&amount=${amount}`,
    config
  );
};

// export const conversionAxiosInstance = axios.create({
//   baseURL: `${currencyBaseUrl}/symbols/?access_key=/${process.env.REACT_APP_API_KEY}`,
// });