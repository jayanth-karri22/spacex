import { getLaunches } from "../../repository/launches/getLaunches";
import { getUpcomingLaunches } from "../../repository/launches/getUpcomingLaunches";
import {
  SET_LAUNCHES_FAILED,
  SET_LAUNCHES_PENDING,
  SET_LAUNCHES_SUCCESS,
} from "./actionTypes";

export const setLaunchesSuccess = (payload) => ({
  type: SET_LAUNCHES_SUCCESS,
  payload,
});

export const setLaunchesError = (error) => ({
  type: SET_LAUNCHES_FAILED,
  error,
});

export const setLaunchesPending = () => ({
  type: SET_LAUNCHES_PENDING,
});

export const fetchLaunches = (queryParams) => async (dispatch) => {
  dispatch(setLaunchesPending());
  try {
    const response = await getLaunches(queryParams);
    dispatch(setLaunchesSuccess(response.data));
  } catch (error) {
    dispatch(setLaunchesError(error));
  }
};

export const fetchUpcomingLaunches = (queryParams) => async (dispatch) => {
  dispatch(setLaunchesPending());
  try {
    const response = await getUpcomingLaunches(queryParams);
    dispatch(setLaunchesSuccess(response.data));
  } catch (error) {
    dispatch(setLaunchesError(error));
  }
};
