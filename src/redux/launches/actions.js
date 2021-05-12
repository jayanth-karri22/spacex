import { getAllLaunches } from '../../repository/launches/getAllLaunches';
import { getUpcomingLaunches } from '../../repository/launches/getUpcomingLaunches';
import {
    SET_ALL_LAUNCHES,
    SET_UPCOMING_LAUNCHES
} from './actionTypes';


export const setAllLaunches = (payload) => ({
    type: SET_ALL_LAUNCHES,
    payload
});

export const setUpcomingLaunches = (payload) => ({
    type: SET_UPCOMING_LAUNCHES,
    payload
})

export const fetchAllLaunches = () => async (dispatch) => {
    try {
        const response = await getAllLaunches();
        dispatch(setAllLaunches(response.data));
    } catch (error) {
        return error;
    }
}

export const fetchUpcomingLaunches = () => async (dispatch) => {
    try {
        const response = await getUpcomingLaunches();
        dispatch(setUpcomingLaunches(response.data))
    } catch (error) {
        return error;
    }
}