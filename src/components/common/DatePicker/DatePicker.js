import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';
import Col from '../Col';
import Modal from '../Modal';
import Row from '../Row';
import Text from '../Text';

const DatePickerWrapper = styled.div`
`

const Margin = styled.div`
width:8px;
`

const DefaultDatesRanges = ['Past week', 'Past month', 'Past 3 months', 'Past 6 months', 'Past year', 'Past 2 years'];

const DatePicker = ({ isOpen, closeModal }) => {
    return (
        <Modal isOpen={isOpen}>
            <DatePickerWrapper onClick={closeModal} style={{ cursor: 'pointer' }}>
                <Row>
                    <Col alignSelf='flex-start' marginTop={PxToRem(4)} borderRight={'1px solid #e4e4e7'}>
                        {
                            DefaultDatesRanges.map((dateRange) => (
                                <Text fontSize={PxToRem(14)} lineHeight={PxToRem(16)} fontWeight={400} color='black' marginBottom={PxToRem(16)}>{dateRange}</Text>
                            ))
                        }
                    </Col>
                    <Margin />
                    <ReactDatePicker inline />
                    <ReactDatePicker inline />
                </Row>
            </DatePickerWrapper>
        </Modal>
    );
}

export default DatePicker;