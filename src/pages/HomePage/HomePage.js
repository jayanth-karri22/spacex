import React, { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Calendar from '../../assets/Icons/Calendar';
import DownArrow from '../../assets/Icons/DownArrow';
import Filter from '../../assets/Icons/Filter';
import Col from '../../components/common/Col';
import Header from '../../components/common/Header';
import Row from '../../components/common/Row';
import Table from '../../components/common/Table';
import Text from '../../components/common/Text';
import Status from '../../components/Status';
import { fetchAllLaunches } from '../../redux/launches/actions';
import { getAllLaunchesResults } from '../../redux/launches/selectors';
import PxToRem from '../../utils/PxToRem';

const ContentContainer = styled.div`
    width: 70%;
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
    return (
        <Row justifyContent={'flex-end'}>
            <Filter />
            <Text margin={`0 ${PxToRem(8)}`} fontSize={PxToRem(16)} lineHeight={PxToRem(16)} letterSpacing='-0.01em'>All Launches</Text>
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
                accessor: 'launch_date_utc'
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
    )

    const DUMMY_DATA = [
        {
            no: 1,
            launched: '24 March 2006 at 22:30',
            location: 'Kwajalein Atoll',
            mission: 'FalconSat',
            orbit: 'LEO',
            status: 'Failed',
            rocket: 'Falcon 9'
        },
        {
            no: 2,
            launched: '28 September 2008 23:15',
            location: 'Kwajalein Atoll',
            mission: 'RatSat',
            orbit: 'LEO',
            status: 'Success',
            rocket: 'Falcon 9'
        },
        {
            no: 3,
            launched: '06 December 2020 16:17',
            location: 'KSC LC 39A',
            mission: 'CRS-21',
            orbit: 'ISS',
            status: 'Upcoming',
            rocket: 'Falcon 9'
        }
    ]
    return (
        <Fragment>
            <Header />
            <ContentContainer>
                <Col>
                    <Row>
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