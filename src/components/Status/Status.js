import React from 'react';
import styled from 'styled-components';
import PxToRem from '../../utils/PxToRem';

const getStatusBackground = (status) => {
    switch (status) {
        case 'Success':
            return '#DEF7EC'
        case 'Failed':
            return '#FDE2E1'
        case 'Upcoming':
            return '#FEF3C7'
        default:
            return '#FEF3C7'
    }
}

const getStatusColor = (status) => {
    switch (status) {
        case 'Success':
            return '#03543F'
        case 'Failed':
            return '#981B1C'
        case 'Upcoming':
            return '#92400F'
        default:
            return '#92400F'
    }
}

const StatusWrapper = styled.div`
    width:${PxToRem(58)};
    height:${PxToRem(21)};
    padding:${PxToRem(4)} ${PxToRem(12)};
    border-radius: ${PxToRem(20)};
    background: ${props => getStatusBackground(props.status)};
    color: ${props => getStatusColor(props.status)};
    margin:0 auto;
`

const Status = ({ status }) => {
    return (
        <StatusWrapper status={status}>{status}</StatusWrapper>
    )
}

export default Status;