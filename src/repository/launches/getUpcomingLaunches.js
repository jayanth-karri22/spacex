import { LAUNCHES } from '../../config/urls';
import axios from '../../http-client';

const getUpcomingLaunches = async () => {
    try {
        let response = await axios.get(LAUNCHES.UPCOMING_LAUNCHES);
        return response;
    }
    catch (error) {
        return error;
    }
}

export { getUpcomingLaunches };
