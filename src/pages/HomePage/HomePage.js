import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Col from '../../components/common/Col';
import Header from '../../components/common/Header';
import Row from '../../components/common/Row';
import Table from '../../components/common/Table';
import Text from '../../components/common/Text';
import SelectDate from '../../components/SelectDate';
import SelectLaunchType from '../../components/SelectLaunchType';
import Status from '../../components/Status';
import { fetchAllLaunches, fetchUpcomingLaunches } from '../../redux/launches/actions';
import { getAllLaunchResults, getFailedLaunchResults, getSuccessfulLaunchResults, getUpcomingLaunchResults } from '../../redux/launches/selectors';
import { monthNames } from '../../utils/constants';
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
    const [selected, setSelected] = useState(ALL_LAUNCHES);
    const toggling = (e, option) => {
        setIsOpen(!isOpen);
        setSelected(option);
    };
    const dispatch = useDispatch();

    const fetchData = {
        [ALL_LAUNCHES]: fetchAllLaunches(),
        [UPCOMING_LAUNCHES]: fetchUpcomingLaunches(),
    }

    const getResults = {
        [ALL_LAUNCHES]: getAllLaunchResults,
        [UPCOMING_LAUNCHES]: getUpcomingLaunchResults,
        [SUCCESSFUL_LAUNCHES]: getSuccessfulLaunchResults,
        [FAILED_LAUNCHES]: getFailedLaunchResults,
    }

    useEffect(() => {
        if (fetchData[selected]) {
            dispatch(fetchData[selected])
        }
    }, [selected])

    const dropdownOptions = [ALL_LAUNCHES, UPCOMING_LAUNCHES, SUCCESSFUL_LAUNCHES, FAILED_LAUNCHES];
    const launches = useSelector(getResults[selected]);
    const COLUMNS = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'flight_number'
            },
            {
                Header: 'Launched(UTC)',
                accessor: d => {
                    const date = new Date(d.launch_date_unix * 1000);
                    return <Text textAlign='initial'>{date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()} at {date.toLocaleTimeString([], { timeStyle: 'short' })}</Text>
                }
            },
            {
                Header: 'Location',
                accessor: 'launch_site.site_name'
            },
            {
                Header: 'Mission',
                accessor: 'mission_name'
            },
            {
                Header: 'Orbit',
                accessor: 'rocket.second_stage.payloads[0].orbit'
            },
            {
                Header: 'Launch Status',
                accessor: 'launch_success',
                Cell: (row) => {
                    return (
                        <Status status={row?.row?.original?.launch_success} />
                    )
                }
            },
            {
                Header: 'Rocket',
                accessor: 'rocket.rocket_name'
            }
        ], []
    );
    return (
        <Fragment>
            <Header />
            <ContentContainer>
                <Col>
                    <Row margin={`${PxToRem(24)} 0`}>
                        <SelectDate />
                        <SelectLaunchType dropdownOptions={dropdownOptions} isOpen={isOpen} selected={selected} toggling={toggling} />
                    </Row>
                    <Row>
                        <Table columns={COLUMNS} tableData={launches} />
                    </Row>
                </Col>
            </ContentContainer>

        </Fragment>
    )
}

export default HomePage;