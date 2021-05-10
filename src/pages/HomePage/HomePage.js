import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Calendar from '../../assets/Icons/Calendar';
import DownArrow from '../../assets/Icons/DownArrow';
import Filter from '../../assets/Icons/Filter';
import Col from '../../components/common/Col';
import Dropdown from '../../components/common/Dropdown';
import Header from '../../components/common/Header';
import Row from '../../components/common/Row';
import Table from '../../components/common/Table';
import Text from '../../components/common/Text';
import Status from '../../components/Status';
import { fetchAllLaunches } from '../../redux/launches/actions';
import { getAllLaunchesResults } from '../../redux/launches/selectors';
import PxToRem from '../../utils/PxToRem';

const ContentContainer = styled.div`
    width: ${PxToRem(952)};
    margin: ${PxToRem(16)} auto;
`

const SelectDate = () => {
    return (
        <Row>
            <Calendar />
            <Text margin={`0 ${PxToRem(8)}`} fontSize={PxToRem(16)} lineHeight={PxToRem(16)} letterSpacing='-0.01em'>Past 6 months</Text>
            <DownArrow />
        </Row>
    )
}

const SelectLaunchType = () => {
    const dropdownOptions = ['All Launches', 'Upcoming Launches', 'Successful Launches', 'Failed Launches'];
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('All Launches');
    const toggling = (e, option) => {
        setIsOpen(!isOpen);
        setSelected(option);
    };
    return (
        <Row justifyContent='flex-end' alignItems='center'>
            <Filter />
            <Dropdown
                options={dropdownOptions}
                isOpen={isOpen}
                toggling={toggling}
                selected={selected}

            />
            <DownArrow />
        </Row>
    )
}

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllLaunches());
    }, [])


    const launches = useSelector(getAllLaunchesResults);
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
                    const monthNames = [
                        "January", "February", "March", "April", "May",
                        "June", "July", "August", "September", "October",
                        "November", "December"];
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
                        <SelectLaunchType />
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