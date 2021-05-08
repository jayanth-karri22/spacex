import { getAllCapsules } from '../../repository/capsules/getAllCapsules';
import {
    SET_ALL_CAPSULES
} from './actionTypes';


export const setAllCapsules = (payload) => ({
    type: SET_ALL_CAPSULES,
    payload
});

export const fetchAllCapsules = () => async (dispatch) => {
    try {
        const response = await getAllCapsules();
        dispatch(setAllCapsules(response.data))
    } catch (error) {
        return error;
    }
}