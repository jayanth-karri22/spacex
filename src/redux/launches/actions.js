import { getAllLaunches } from '../../repository/launches/getAllLaunches';
import {
    SET_ALL_LAUNCHES
} from './actionTypes';


export const setAllLaunches = (payload) => ({
    type: SET_ALL_LAUNCHES,
    payload
});

export const fetchAllLaunches = () => async (dispatch) => {
    try {
        const response = await getAllLaunches();
        dispatch(setAllLaunches(response.data))
    } catch (error) {
        return error;
    }
}