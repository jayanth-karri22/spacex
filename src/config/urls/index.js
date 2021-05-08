const { REACT_APP_ENVIRONMENT = 'dev' } = process.env;

export const BASE_URL = {
    dev: 'https://api.spacexdata.com',
}[REACT_APP_ENVIRONMENT];

export const CAPSULES = {
    ALL_CAPSULES: '/v3/capsules',
    ONE_CAPSULE: 'v3/capsules/{{capsule_serial}}',
    UPCOMING_CAPSULES: '/v3/capsules/upcoming',
    PAST_CAPSULES: '/v3/capsules/past'
}