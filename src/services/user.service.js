import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./constants";
const API_URL = "/api/test/";
const getPublicContent = () => {
  return axios.get(API_BASE + API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_BASE + API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_BASE + API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_BASE + API_URL + "admin", { headers: authHeader() });
};


export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};