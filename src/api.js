import axios from "axios"

const currencyBaseUrl = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency`;
const compareBaseUrl = `https://api.priceapi.com/v2`;
const rakutenApi = `https://rakuten_webservice-rakuten-marketplace-product-search-v1.p.rapidapi.com/services/api/Product/Search/20170426`;
const ebayApi = `https://ebay32.p.rapidapi.com/search`;
 const aliexpressApi = `https://ali-express-data-service.p.rapidapi.com/search/searchItems`
 const pinduoduoApi = `https://pinduoduo-pin-duo-duo-data-service1.p.rapidapi.com/search/searchItems`;
 const jingdongApi = `https://jingdong-jing-dong-data-service.p.rapidapi.com/search/searchItems`;
 const amazonApi = `https://parazun-amazon-data.p.rapidapi.com/search/`;
 const walmartApi = `https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword`;
 const pricerApi = `https://pricer.p.rapidapi.com/str`;
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

 const walmartOptions = {
   method: "GET",

   params: {
     page: "1",
     sortBy: "best_match",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "axesso-walmart-data-service.p.rapidapi.com",
   },
 };

 const pricerOptions = {
   params: { q: "" },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "pricer.p.rapidapi.com",
   },
 };
 const aliexpressOptions = {
   method: "GET",
   params: {
     inStock: "true",
     hasDiscount: "true",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "ali-express-data-service.p.rapidapi.com",
   },
 };

 const priceConfig = {
   headers: {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
   },
 };

 const JingDongOptions = {
   method: "GET",
   params: {
     hasDiscount: "true",
     inStock: "true",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "jingdong-Jing-Dong-data-service.p.rapidapi.com",
   },
 };
 const rakutenOptions = {
   params: { keyword: "" },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host":
       "rakuten_webservice-rakuten-marketplace-product-search-v1.p.rapidapi.com",
   },
 };

 const ebayOptions = {
   method: "GET",
   params: {
     page: "1",
     country: "united states",
     country_code: "us",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "ebay32.p.rapidapi.com",
   },
 };

 const amazonOptions = {
   params: {
     region: "US",
     page: "1",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "parazun-amazon-data.p.rapidapi.com",
   },
 };

 const pinduoduoOptions = {
   method: "GET",
   params: {
     hasDiscount: "true",
     inStock: "true",
   },
   headers: {
     "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
     "X-RapidAPI-Host": "pinduoduo-Pin-Duo-Duo-data-service1.p.rapidapi.com",
   },
 };

 export const requestRakuten = (term) => {
   rakutenOptions.params.keyword = term;
   return axios.get(`${rakutenApi}`, rakutenOptions);
 };

 export const requestPricer = (term) => {
   pricerOptions.params.q = term;
   return axios.get(`${pricerApi}`, pricerOptions);
 };

 export const requestAmazon = (term) => {
   amazonOptions.params.keywords = term;
   return axios.get(`${amazonApi}`, amazonOptions);
 };
 export const requestWalmart = (term) => {
   walmartOptions.params.keyword = term;
   return axios.get(`${walmartApi}`, walmartOptions);
 };
export const requestAliExpress = (term) => {
  aliexpressOptions.params.query = term;
  return axios.get(`${aliexpressApi}`, aliexpressOptions);
};
export const requestJingDong = (term) => {
  JingDongOptions.params.query = term;
  return axios.get(`${jingdongApi}`, JingDongOptions);
};
export const requestPingDuo = (term) => {
  pinduoduoOptions.params.query = term;
  return axios.get(`${pinduoduoApi}`, pinduoduoOptions);
};

export const requestEbayNew = (term) => {
  rakutenOptions.params.keyword = term;
  return axios.get(`${ebayApi}/${term}`, ebayOptions);
};


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