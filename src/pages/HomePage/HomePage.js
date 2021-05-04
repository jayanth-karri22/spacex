import React, { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Table from '../../components/common/Table';
import Status from '../../components/Status';

const ContentContainer = styled.div`
    width: 70%;
    margin: 0 auto;
`

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
        }
    ]
    return (
        <Fragment>
            <Header />
            <ContentContainer>
                <Table columns={COLUMNS} tableData={DUMMY_DATA} />
            </ContentContainer>

        </Fragment>
    )
}

export default HomePage;