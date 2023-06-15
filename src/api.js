import axios from "axios"

const currencyBaseUrl = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency`;

// export const currencyAxiosInstance = axios.create({
//   baseURL: `${currencyBaseUrl}/symbols/?access_key=/${process.env.REACT_APP_API_KEY}`,
 
// });
const config = {
  headers: {
    "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
    "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
  },
};
export const currencySymbols =  () =>{
    return axios.get(
      `${currencyBaseUrl}/`, config
    );
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