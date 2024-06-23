import axios from "axios";
export const authApi = axios.create({
  baseURL: "https://task-manager.codionslab.com/api",
  
});
