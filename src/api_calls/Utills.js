import axios from "axios";

export const Get = (url) => {
  return axios.get(url);
};

export const Delete = (url) => {
  return axios.delete(url);
};

export const Put = (url, requestContact) => {
  return axios.put(url, requestContact);
};

export const Post = (url, requestContact) => {
    return axios.post(url, requestContact);
  };
