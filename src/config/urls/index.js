const { REACT_APP_ENVIRONMENT = 'dev' } = process.env;

export const BASE_URL = {
    dev: 'https://api.spacexdata.com',
}[REACT_APP_ENVIRONMENT];

export const LAUNCHES = {
    ALL_LAUNCHES: '/v3/launches',
    ONE_LAUNCH: '/v3/launches/{{flight_number}}',
    UPCOMING_LAUNCHES: '/v3/launches/upcoming',
    PAST_LAUNCHES: '/v3/launches/past',
    LATEST_LAUNCH: '/v3/launches/latest',
    NEXT_LAUNCH: '/v3/launches/next'
}