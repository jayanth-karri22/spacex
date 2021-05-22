import Text from '../components/common/Text';
import Status from '../components/Status';
import { monthNames } from './constants';

export const launchTableColumns = [
  {
    Header: 'No',
    accessor: 'flight_number'
  },
  {
    Header: 'Launched(UTC)',
    accessor: d => {
      const date = new Date(d.launch_date_unix * 1000);
      return (
        <Text textAlign='initial'>
          {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()} at{' '}
          {date.toLocaleTimeString([], { timeStyle: 'short' })}
        </Text>
      );
    }
  },
  {
    Header: 'Location',
    accessor: 'launch_site.site_name'
  },
  {
    Header: 'Mission',
    accessor: 'mission_name'
  },
  {
    Header: 'Orbit',
    accessor: 'rocket.second_stage.payloads[0].orbit'
  },
  {
    Header: 'Launch Status',
    accessor: 'launch_success',
    Cell: row => {
      return <Status status={row?.row?.original?.launch_success} />;
    }
  },
  {
    Header: 'Rocket',
    accessor: 'rocket.rocket_name'
  }
];
