import React, { Fragment, useMemo } from 'react';
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
    const COLUMNS = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Launched(UTC)',
                accessor: 'launched'
            },
            {
                Header: 'Location',
                accessor: 'location'
            },
            {
                Header: 'Mission',
                accessor: 'mission'
            },
            {
                Header: 'Orbit',
                accessor: 'orbit'
            },
            {
                Header: 'Launch Status',
                accessor: 'status',
                Cell: (row) => {
                    console.log(row);
                    return (
                        <Status status={row?.row?.original?.status} />
                    )
                }
            },
            {
                Header: 'Rocket',
                accessor: 'rocket'
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
                        <Table columns={COLUMNS} tableData={DUMMY_DATA} />
                    </Row>
                </Col>
            </ContentContainer>

        </Fragment>
    )
}

export default HomePage;