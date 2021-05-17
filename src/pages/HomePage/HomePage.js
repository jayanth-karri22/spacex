import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Col from '../../components/common/Col';
import Header from '../../components/common/Header';
import Row from '../../components/common/Row';
import Table from '../../components/common/Table';
import LaunchCard from '../../components/LaunchCard';
import SelectDate from '../../components/SelectDate';
import SelectLaunchType from '../../components/SelectLaunchType';
import { fetchLaunches, fetchUpcomingLaunches } from '../../redux/launches/actions';
import { getLaunchResults, getLoadingState } from '../../redux/launches/selectors';
import { launchTableColumns } from '../../utils/launchTableColumns';
import PxToRem from '../../utils/PxToRem';

const ContentContainer = styled.div`
    width: ${PxToRem(952)};
    margin: ${PxToRem(16)} auto;
`

const HomePage = () => {
    const ALL_LAUNCHES = 'All Launches';
    const UPCOMING_LAUNCHES = 'Upcoming Launches';
    const SUCCESSFUL_LAUNCHES = 'Successful Launches';
    const FAILED_LAUNCHES = 'Failed Launches'
    const [isOpen, setIsOpen] = useState(false);
    const [launchDetails, setLaunchDetails] = useState({});
    const [selected, setSelected] = useState(ALL_LAUNCHES);
    const [isLaunchCardOpen, setIsLaunchCardOpen] = useState(false);
    const [dateQueryParam, setDateQueryParam] = useState({ start: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()), end: new Date() });
    const toggling = (e, option) => {
        setIsOpen(!isOpen);
        setSelected(option);
    };
    const dispatch = useDispatch();

    const fetchData = {
        [ALL_LAUNCHES]: fetchLaunches({ ...dateQueryParam }),
        [UPCOMING_LAUNCHES]: fetchUpcomingLaunches({ ...dateQueryParam }),
        [SUCCESSFUL_LAUNCHES]: fetchLaunches({ launch_success: true, ...dateQueryParam }),
        [FAILED_LAUNCHES]: fetchLaunches({ launch_success: false, ...dateQueryParam })
    }
    const pending = useSelector(getLoadingState);
    useEffect(() => {
        if (fetchData[selected]) {
            dispatch(fetchData[selected])
        }
    }, [selected, dateQueryParam])


    const closeLaunchModal = () => {
        setIsLaunchCardOpen(false);
    }

    const dropdownOptions = [ALL_LAUNCHES, UPCOMING_LAUNCHES, SUCCESSFUL_LAUNCHES, FAILED_LAUNCHES];
    const launches = useSelector(getLaunchResults);
    const COLUMNS = useMemo(
        () => launchTableColumns, []
    );

    const openLaunchCard = (launch) => {
        setLaunchDetails(launch);
        setIsLaunchCardOpen(!isLaunchCardOpen);
    }

    const getQueryParams = (startDate, endDate) => {
        setDateQueryParam({ start: startDate, end: endDate });
    }

    return (
        <>
            <Header />
            <ContentContainer>
                <Col>
                    <Row margin={`${PxToRem(24)} 0`}>
                        <SelectDate getQueryParams={getQueryParams} />
                        <SelectLaunchType dropdownOptions={dropdownOptions} isOpen={isOpen} selected={selected} toggling={toggling} />
                    </Row>
                    <Row>
                        <Table columns={COLUMNS} tableData={launches} openLaunchCard={openLaunchCard} loading={pending} />
                    </Row>
                </Col>
            </ContentContainer>
            <LaunchCard launchDetails={launchDetails} isOpen={isLaunchCardOpen} closeModal={closeLaunchModal} />
        </>
    )
}

export default HomePage;