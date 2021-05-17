import React from 'react';
import styled from 'styled-components';
import PxToRem from '../../utils/PxToRem';
import Text from '../common/Text';

const getStatusBackground = (status) => {
    switch (status) {
        case true:
            return '#DEF7EC'
        case false:
            return '#FDE2E1'
        case null:
            return '#FEF3C7'
        default:
            return '#FEF3C7'
    }
}

const getStatusColor = (status) => {
    switch (status) {
        case true:
            return '#03543F'
        case false:
            return '#981B1C'
        case null:
            return '#92400F'
        default:
            return '#92400F'
    }
}

const getStatus = (status) => {
    switch (status) {
        case true:
            return 'Success'
        case false:
            return 'Failed'
        case null:
            return 'Upcoming'
    }
}

const StatusWrapper = styled.div`
    width:${PxToRem(58)};
    height:${PxToRem(21)};
    padding:${PxToRem(4)} ${PxToRem(12)};
    border-radius: ${PxToRem(20)};
    background: ${props => getStatusBackground(props.status)};
    margin:0;
`

const Status = ({ status }) => {
    return (
        <StatusWrapper status={status}><Text marginTop={PxToRem(4)} color={getStatusColor(status)}>{getStatus(status)}</Text></StatusWrapper>
    )
}

export default Status;