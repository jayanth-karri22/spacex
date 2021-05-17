import React from 'react';
import PxToRem from '../../utils/PxToRem';
import Modal from '../common/Modal';

const LaunchCard = ({ launchDetails, isOpen }) => {
    console.log(launchDetails, "LAUNCH DETAILS")
    return (
        <Modal isOpen={isOpen} containerHeight={PxToRem(741)} containerWidth={PxToRem(544)}>
            <div>{launchDetails.flight_number}</div>
        </Modal>
    )
}

export default LaunchCard;