/*global chrome*/
import axios from "axios";

let user = localStorage.getItem("user")

const backendUrl = "https://api.skoutpay.com/api"



const userConfig = {
  headers: {
    "x-access-token": user?.token,
  },
};

export const login = (body) => {
  return axios.post(`${backendUrl}/user/login`, body);
};

export const  forgotPassword = (body) =>{
  return axios.post(`${backendUrl}/user/reset-password`, body)
}

export const signUp = (body) => {
  return axios.post(`${backendUrl}/user/signup`, body);
};

export const getSublist = () => {
  return axios.get(`${backendUrl}/payments/sublist`, userConfig);
};

export const getActiveub = (userId) => {
  return axios.get(
    `${backendUrl}/subscribe/active?userId=${userId}`,
    userConfig
  );
};

export const getAllSubs = (userId) => {
  return axios.get(
    `${backendUrl}/subscribe/subscrptions?userId=${userId}`,
    userConfig
  );
};

export const getWishlist = (userId, token) => {
  userConfig.headers["x-access-token"]=token
  return axios.get(
    `${backendUrl}/wishlist/getwishlist?userId=${userId}`,
    userConfig
  );
};
export const AddToWishlist = (body) => {
  return axios.post(`${backendUrl}/wishlist/add`, body, userConfig);
};
export const deleteWishlist = (userId, itemId) => {
  return axios.delete(
    `${backendUrl}/wishlist/delete?userId=${userId}&itemId=${itemId}`,
    userConfig
  );
};

export const requestSearch = (term, userId, store, sessionId, token) => {
  userConfig.headers["x-access-token"] = token;
  return axios.get(
    `${backendUrl}/search/search?userId=${userId}&term=${term}&store=${store}&sessionId=${sessionId}`, userConfig
  );
};

export const convertAmount = (from, to, amount,token) => {
  userConfig.headers["x-access-token"]=token
  return axios.get(
    `${backendUrl}/search/converter?&have=${from}&want=${to}&amount=${amount}`,
    userConfig
  );
};