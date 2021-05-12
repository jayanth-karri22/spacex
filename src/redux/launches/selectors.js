export const getAllLaunchResults = ({ launches }) => launches.allLaunches;
export const getUpcomingLaunchResults = ({ launches }) => launches.upcomingLaunches;
export const getSuccessfulLaunchResults = ({ launches }) => launches.allLaunches.filter((item) => item.launch_success);
export const getFailedLaunchResults = ({ launches }) => launches.allLaunches.filter((item) => !item.launch_success && item.launch_success != null)
