import { LAUNCHES } from '../../config/urls';
import axios from '../../http-client';

const getUpcomingLaunches = async (queryParams) => {
    try {
        let response = await axios.get(LAUNCHES.UPCOMING_LAUNCHES, {
            params: queryParams
        });
        return response;
    }
    catch (error) {
        return error;
    }
}

export { getUpcomingLaunches };
