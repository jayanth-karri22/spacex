import { LAUNCHES } from "../../config/urls";
import axios from "../../http-client";

const getLaunches = async (queryParams) => {
  try {
    let response = await axios.get(LAUNCHES.ALL_LAUNCHES, {
      params: queryParams,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { getLaunches };
