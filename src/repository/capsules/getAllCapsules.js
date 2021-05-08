import { CAPSULES } from '../../config/urls';
import axios from '../../http-client';

const getAllCapsules = async () => {
    try {
        let response = await axios.get(CAPSULES.ALL_CAPSULES);
        return response;
    }
    catch (error) {
        return error;
    }
}

export { getAllCapsules };
