import { useState } from 'react';
import Calendar from '../../assets/Icons/Calendar';
import DownArrow from '../../assets/Icons/DownArrow';
import PxToRem from '../../utils/PxToRem';
import DatePicker from '../common/DatePicker';
import Row from '../common/Row';
import Text from '../common/Text';

const SelectDate = ({ getQueryParams, location }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const [filterText, setFilterText] = useState('Till Date');

  const getFilterText = text => {
    setFilterText(text);
  };

  return (
    <>
      <Row onClick={handleToggleCalendar} style={{ cursor: 'pointer' }}>
        <Calendar />
        <Text margin={`0 ${PxToRem(8)}`} fontSize={PxToRem(16)} lineHeight={PxToRem(16)} letterSpacing='-0.01em'>
          {filterText}
        </Text>
        <DownArrow />
      </Row>
      <DatePicker
        location={location}
        getFilterText={getFilterText}
        getQueryParams={getQueryParams}
        isOpen={showCalendar}
        closeModal={handleToggleCalendar}
      />
    </>
  );
};

export default SelectDate;
