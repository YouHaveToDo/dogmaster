import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const url = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: url,
});

export const apis = {
  callData: (state) => instance.get(`1`),
};
export default apis;
