import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
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

const HomePage = ({ location }) => {
    const ALL_LAUNCHES = 'All Launches';
    const UPCOMING_LAUNCHES = 'Upcoming Launches';
    const SUCCESSFUL_LAUNCHES = 'Successful Launches';
    const FAILED_LAUNCHES = 'Failed Launches'
    const [isOpen, setIsOpen] = useState(false);
    const [launchDetails, setLaunchDetails] = useState({});
    const urlToSelectMappers = {
        '/launches': ALL_LAUNCHES,
        '/launches/upcoming': UPCOMING_LAUNCHES,
        '/launches?launch_success=true': SUCCESSFUL_LAUNCHES,
        '/launches?launch_success=false': FAILED_LAUNCHES
    }
    const [selected, setSelected] = useState(urlToSelectMappers[`${location.pathname}${location.search}`]);
    const [isLaunchCardOpen, setIsLaunchCardOpen] = useState(false);
    const [dateQueryParam, setDateQueryParam] = useState({ start: new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()), end: new Date() });
    const history = useHistory()

    const toggling = (e, option) => {
        setIsOpen(!isOpen);
        setSelected(option);
        if (isOpen) {
            history.push(selectedToURlMappers[option]);
        }
    };

    const dispatch = useDispatch();

    const fetchData = {
        [ALL_LAUNCHES]: fetchLaunches,
        [UPCOMING_LAUNCHES]: fetchUpcomingLaunches,
        [SUCCESSFUL_LAUNCHES]: fetchLaunches,
        [FAILED_LAUNCHES]: fetchLaunches
    }

    const pending = useSelector(getLoadingState);
    const selectedToURlMappers = {
        [ALL_LAUNCHES]: '/launches',
        [UPCOMING_LAUNCHES]: '/launches/upcoming',
        [SUCCESSFUL_LAUNCHES]: '/launches?launch_success=true',
        [FAILED_LAUNCHES]: '/launches?launch_success=false'
    }

    useEffect(() => {
        setSelected(urlToSelectMappers[`${location.pathname}${location.search}`]);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const params = queryString.parse(location.search);
        dispatch(fetchData[urlToSelectMappers[location?.pathname]]({ ...params, ...dateQueryParam }))
    }, [selected, dateQueryParam, location.search, location.pathname])


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