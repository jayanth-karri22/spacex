import { useEffect, useState } from 'react';
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
    line-heigt:18px;
    font-weight:bold;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    outline:none;
 
`

const Seperator = styled.div`
    background: #e4e4e7;
    width:2px;
    margin-right:${PxToRem(8)};
    height:${PxToRem(257)};
`

const HorizontalRule = styled.hr`
    width: 90%;
    margin: 0 auto;
    margin: 8px 0 8px 8px;
    opacity:0.4;
`

const DefaultDatesRanges = ['Past week', 'Past month', 'Past 3 months', 'Past 6 months', 'Past year', 'Past 2 years'];

const DatePicker = ({ isOpen, closeModal, getDateQueryParams, getFilterText }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date());
    const [startDateSelected, setStartDateSelected] = useState(false);
    const [endDateSelected, setEndDateSelected] = useState(false);
    const [dateRangeSelected, setDateRangeSelected] = useState('All Launches');

    useEffect(() => {
        getFilterText(dateRangeSelected);
        getDateQueryParams(startDate, endDate);
    }, [startDate, endDate])

    const handleStartDateChange = async (date) => {
        await setStartDate(date);
        await setStartDateSelected(true);
        if (endDateSelected) {
            setStartDateSelected(false);
            getFilterText(`${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}`)
            await closeModal();
        }
    };
    const handleEndDateChange = async (date) => {
        await setEndDate(date);
        await setEndDateSelected(true);
        if (startDateSelected) {
            setEndDateSelected(false);
            getFilterText(`${monthNames[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()} - ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`)
            await closeModal();
        }
    };

    const handleDateRangeSelect = (e, range) => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        setDateRangeSelected(range);
        switch (range) {
            case 'Past week':
                setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7));
                break;
            case 'Past month':
                setStartDate(new Date(year, month - 1, date));
                break;
            case 'Past 3 months':
                setStartDate(new Date(year, month - 3, date));
                break;
            case 'Past 6 months':
                setStartDate(new Date(year, month - 6, date));
                break;
            case 'Past year':
                setStartDate(new Date(year - 1, month, date));
                break;
            case 'Past 2 years':
                setStartDate(new Date(year - 2, month, date));
                break;
            default:
                setStartDate('');
                setDateRangeSelected('All Launches');
                setEndDate('');
                break;
        }

        closeModal();
    }

    const years = Array(20).fill().map((_, idx) => endDate.getFullYear() - idx);

    return (
        <Modal isOpen={isOpen}>
            <DatePickerWrapper style={{ cursor: 'pointer' }}>
                <Row>
                    <Col alignSelf='flex-start' marginTop={PxToRem(4)} >
                        {
                            DefaultDatesRanges.map((dateRange) => (
                                <div onClick={(e) => handleDateRangeSelect(e, dateRange)}>
                                    <Text fontSize={PxToRem(14)} lineHeight={PxToRem(16)} fontWeight={400} color='black' marginBottom={PxToRem(16)}>{dateRange}</Text>
                                </div>
                            ))
                        }
                    </Col>
                    <Seperator />

                    <ReactDatePicker
                        inline
                        maxDate={endDate}
                        renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                            <>
                                <Row justifyContent='space-between'>
                                    <LeftArrow onClick={decreaseMonth} style={{ marginLeft: PxToRem(16) }} />
                                    <div style={{ display: 'flex', marginLeft: PxToRem(-48) }}>
                                        <Select
                                            style={{ padding: 0 }}
                                            value={monthNames[date.getMonth()]}
                                            onChange={({ target: { value } }) => changeMonth(monthNames.indexOf(value))}
                                        >
                                            {monthNames.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        <SelectIcon />
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
                                        <SelectIcon />
                                    </div>

                                </Row>
                                <HorizontalRule />
                            </>
                        )}
                        selected={new Date(startDate) < new Date(endDate) && startDate}
                        onChange={handleStartDateChange}
                    />
                    <ReactDatePicker
                        inline
                        minDate={startDate}
                        renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeMonth, changeYear }) => (
                            <>
                                <Row justifyContent='space-between'>
                                    <div style={{ display: 'flex', marginLeft: PxToRem(24), width: PxToRem(100) }}>
                                        <Select
                                            style={{ padding: 0 }}
                                            value={monthNames[date.getMonth()]}
                                            onChange={({ target: { value } }) => changeMonth(monthNames.indexOf(value))}
                                        >
                                            {monthNames.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        <SelectIcon />
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
                                        <SelectIcon />

                                    </div>
                                    <RightArrow onClick={increaseMonth} style={{ marginRight: PxToRem(16) }} />
                                </Row>
                                <HorizontalRule />
                            </>
                        )}
                        selected={new Date(startDate) < new Date(endDate) && endDate}
                        onChange={handleEndDateChange}
                    />
                </Row>
            </DatePickerWrapper>
        </Modal>
    );
}

export default DatePicker;