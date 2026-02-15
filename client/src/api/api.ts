import axios from "axios";

const API = axios.create({
  baseURL: "https://shiyad0344-meeting-action-tracker-b.vercel.app/api",
});

export default API;
