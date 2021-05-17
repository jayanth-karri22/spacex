import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Col from '../../components/common/Col';
import Header from '../../components/common/Header';
import Row from '../../components/common/Row';
import Table from '../../components/common/Table';
import SelectDate from '../../components/SelectDate';
import SelectLaunchType from '../../components/SelectLaunchType';
import { fetchLaunches, fetchUpcomingLaunches } from '../../redux/launches/actions';
import { getLaunchResults } from '../../redux/launches/selectors';
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
    const [selected, setSelected] = useState(ALL_LAUNCHES);
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

    useEffect(() => {
        if (fetchData[selected]) {
            dispatch(fetchData[selected])
        }
    }, [dateQueryParam, selected])

    const dropdownOptions = [ALL_LAUNCHES, UPCOMING_LAUNCHES, SUCCESSFUL_LAUNCHES, FAILED_LAUNCHES];
    const launches = useSelector(getLaunchResults);
    const COLUMNS = useMemo(
        () => launchTableColumns, []
    );

    const getDateQueryParams = (startDate, endDate) => {
        setDateQueryParam({ start: startDate, end: endDate });
    }

    return (
        <Fragment>
            <Header />
            <ContentContainer>
                <Col>
                    <Row margin={`${PxToRem(24)} 0`}>
                        <SelectDate getDateQueryParams={getDateQueryParams} />
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