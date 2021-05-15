import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import '../../../assets/css/react-datepicker.css';
import LeftArrow from '../../../assets/Icons/LeftArrow';
import RightArrow from '../../../assets/Icons/RightArrow';
import SelectIcon from '../../../assets/Icons/Select';
import { monthNames } from '../../../utils/constants';
import PxToRem from '../../../utils/PxToRem';
import Col from '../Col';
import Modal from '../Modal';
import Row from '../Row';
import Text from '../Text';

const DatePickerWrapper = styled.div`
`
const Select = styled.select`
    font-size: 14px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    outline:none;
`

const Seperator = styled.div`
    background: #e4e4e7;
    width:2px;
    height:${PxToRem(257)};
`

const HorizontalRule = styled.hr`
    width: 90%;
    margin: 0 auto;
    margin: 8px 0 8px 8px;
    opacity:0.4;
`

const DefaultDatesRanges = ['Past week', 'Past month', 'Past 3 months', 'Past 6 months', 'Past year', 'Past 2 years'];

const DatePicker = ({ isOpen, closeModal }) => {
    const [date, setDate] = useState(new Date());
    const handleChange = (date) => [setDate(date)];
    const years = Array(20).fill().map((_, idx) => date.getFullYear() - idx);
    const handleEndDateChange = (increaseMonth) => {
        increaseMonth();
        closeModal();
    }
    return (
        <Modal isOpen={isOpen}>
            <DatePickerWrapper style={{ cursor: 'pointer' }}>
                <Row>
                    <Col alignSelf='flex-start' marginTop={PxToRem(4)} >
                        {
                            DefaultDatesRanges.map((dateRange) => (
                                <Text fontSize={PxToRem(14)} lineHeight={PxToRem(16)} fontWeight={400} color='black' marginBottom={PxToRem(16)}>{dateRange}</Text>
                            ))
                        }
                    </Col>
                    <Seperator />

                    <ReactDatePicker
                        inline
                        renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                            <>
                                <Row justifyContent='space-between'>
                                    <LeftArrow onClick={decreaseMonth} style={{ marginLeft: PxToRem(16) }} />
                                    <div style={{ display: 'flex', marginLeft: PxToRem(-48) }}>
                                        <Text>{monthNames[date.getMonth()]}</Text>
                                        <SelectIcon onClick={changeMonth} style={{ marginLeft: PxToRem(4) }} />
                                    </div>
                                    <div style={{ marginRight: PxToRem(24) }}>
                                        <Select
                                            style={{ padding: 0 }}
                                            value={date.getFullYear()}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                            {years.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        <SelectIcon onClick={changeMonth} />
                                    </div>

                                </Row>
                                <HorizontalRule />
                            </>
                        )}
                        selected={date}
                        onChange={handleChange}
                    />
                    <ReactDatePicker
                        inline
                        renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                            <>
                                <Row justifyContent='space-between'>
                                    <div style={{ display: 'flex', marginLeft: PxToRem(24), width: PxToRem(100) }}>
                                        <Text>{monthNames[date.getMonth()]}</Text>
                                        <SelectIcon onClick={changeMonth} style={{ marginLeft: PxToRem(4) }} />
                                    </div>
                                    <div>
                                        <Select
                                            style={{ padding: 0 }}
                                            value={date.getFullYear()}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                            {years.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        <SelectIcon onClick={changeMonth} />

                                    </div>
                                    <RightArrow onClick={() => handleEndDateChange(increaseMonth)} style={{ marginRight: PxToRem(16) }} />
                                </Row>
                                <HorizontalRule />
                            </>
                        )}
                        selected={date}
                        onChange={handleChange}
                    />
                </Row>
            </DatePickerWrapper>
        </Modal>
    );
}

export default DatePicker;