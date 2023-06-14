import axios from "axios"

const currencyBaseUrl = `https://api.exchangeratesapi.io/v1/`

export const currencyAxiosInstance = axios.create({
  baseURL: `${currencyBaseUrl}/symbols/?access_key=/${process.env.REACT_APP_API_KEY}`,
 
});


export const conversionAxiosInstance = axios.create({
  baseURL: `${currencyBaseUrl}/symbols/?access_key=/${process.env.REACT_APP_API_KEY}`,
});