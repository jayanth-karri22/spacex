import DownArrow from '../../assets/Icons/DownArrow';
import Filter from '../../assets/Icons/Filter';
import Dropdown from '../common/Dropdown';
import Row from '../common/Row';

const SelectLaunchType = ({ isOpen, selected, toggling, dropdownOptions }) => {
  return (
    <Row justifyContent='flex-end' alignItems='center'>
      <Filter />
      <Dropdown options={dropdownOptions} isOpen={isOpen} toggling={toggling} selected={selected} />
      <DownArrow />
    </Row>
  );
};

export default SelectLaunchType;
