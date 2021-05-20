import axios from "axios";
import { BASE_URL } from "../config/urls";

export default axios.create({
  baseURL: BASE_URL,
  headers: {},
});
