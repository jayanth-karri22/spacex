import { LAUNCHES } from '../../config/urls';
import axios from '../../http-client';

const getAllLaunches = async () => {
    try {
        let response = await axios.get(LAUNCHES.ALL_LAUNCHES);
        return response;
    }
    catch (error) {
        return error;
    }
}

export { getAllLaunches };
