import { getLaunches } from '../../repository/launches/getLaunches';
import { getUpcomingLaunches } from '../../repository/launches/getUpcomingLaunches';
import {
    SET_LAUNCHES
} from './actionTypes';


export const setLaunches = (payload) => ({
    type: SET_LAUNCHES,
    payload
});

export const fetchLaunches = (queryParams) => async (dispatch) => {
    try {
        const response = await getLaunches(queryParams);
        dispatch(setLaunches(response.data));
    } catch (error) {
        return error;
    }
}

export const fetchUpcomingLaunches = (queryParams) => async (dispatch) => {
    try {
        const response = await getUpcomingLaunches(queryParams);
        dispatch(setLaunches(response.data))
    } catch (error) {
        return error;
    }
}