import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
`;

const HomePage = ({ location }) => {
  const getStartQuery = () => {
    let startQuery = queryString.parse(location.search).start;
    let endQuery = queryString.parse(location.search).end;

    startQuery = startQuery == 'Invalid Date' || startQuery == undefined ? new Date(new Date().getFullYear(), new Date().getMonth()-6, new Date().getDate()) : startQuery;
    endQuery = endQuery == 'Invalid Date' || endQuery == undefined ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : endQuery;

    return {start: startQuery, end: endQuery}
  }

  const ALL_LAUNCHES = 'All Launches';
  const UPCOMING_LAUNCHES = 'Upcoming Launches';
  const SUCCESSFUL_LAUNCHES = 'Successful Launches';
  const FAILED_LAUNCHES = 'Failed Launches';
  const [isOpen, setIsOpen] = useState(false);
  const [launchDetails, setLaunchDetails] = useState({});
  const [dateQueryParam, setDateQueryParam] = useState(getStartQuery());
  

  const urlToSelectMappers = {
    [`/launches?start=${dateQueryParam.start}&end=${dateQueryParam.end}`]: ALL_LAUNCHES,
    [`/launches/upcoming?start=${dateQueryParam.start}&end=${dateQueryParam.end}`]: UPCOMING_LAUNCHES,
    [`/launches?launch_success=true&start=${dateQueryParam.start}&end=${dateQueryParam.end}`]: SUCCESSFUL_LAUNCHES,
    [`/launches?launch_success=false&start=${dateQueryParam.start}&end=${dateQueryParam.end}`]: FAILED_LAUNCHES
  };
  const [selected, setSelected] = useState(urlToSelectMappers[`${location.pathname}${location.search}`]);
  const [isLaunchCardOpen, setIsLaunchCardOpen] = useState(false);
  const history = useHistory();
  const toggling = (e, option) => {
    setIsOpen(!isOpen);
    setSelected(option);
    if (isOpen) {
      history.push(selectedToURlMappers[option]);
    }
  };

  const dispatch = useDispatch();

  const pending = useSelector(getLoadingState);
  const selectedToURlMappers = {
    [ALL_LAUNCHES]: `/launches?start=${dateQueryParam.start}&end=${dateQueryParam.end}`,
    [UPCOMING_LAUNCHES]: `/launches/upcoming?start=${dateQueryParam.start}&end=${dateQueryParam.end}`,
    [SUCCESSFUL_LAUNCHES]: `/launches?launch_success=true&start=${dateQueryParam.start}&end=${dateQueryParam.end}`,
    [FAILED_LAUNCHES]: `/launches?launch_success=false&start=${dateQueryParam.start}&end=${dateQueryParam.end}`
  };

  useEffect(() => {
    setSelected(urlToSelectMappers[`${location.pathname}${location.search}`]);
  }, [location.pathname, location.search]);

  useEffect(() => {
    let params = {
      launch_success: queryString.parse(location.search).launch_success
    };
    if (dateQueryParam.start != 'Invalid Date' && dateQueryParam.end != 'Invalid Date') {
      params = { ...params, ...dateQueryParam };
    }

    if (location.pathname === '/launches') {
      dispatch(fetchLaunches({ ...params }));
    } else if (location.pathname === '/launches/upcoming') {
      dispatch(fetchUpcomingLaunches({ ...params }));
    }
  }, [selected, dateQueryParam, location.search, location.pathname]);

  useEffect(() => {
    if(queryString.parse(location.search).launch_success){
      history.push(`${location.pathname}&start=${dateQueryParam.start}&end=${dateQueryParam.end}`);
    }
    else{
      history.push(`${location.pathname}?start=${dateQueryParam.start}&end=${dateQueryParam.end}`);
    }
    
  }, [dateQueryParam]);

  const closeLaunchModal = () => {
    setIsLaunchCardOpen(false);
  };
  const dropdownOptions = [ALL_LAUNCHES, UPCOMING_LAUNCHES, SUCCESSFUL_LAUNCHES, FAILED_LAUNCHES];
  const launches = useSelector(getLaunchResults);
  const COLUMNS = useMemo(() => launchTableColumns, []);

  const openLaunchCard = launch => {
    setLaunchDetails(launch);
    setIsLaunchCardOpen(!isLaunchCardOpen);
  };

  const getQueryParams = (startDate, endDate) => {
    let queryParam = { start: startDate, end: endDate };
    setDateQueryParam(queryParam);
  };

  return (
    <>
      <Header />
      <ContentContainer>
        <Col>
          <Row margin={`${PxToRem(24)} 0`}>
            <SelectDate getQueryParams={getQueryParams} location={location} getStartQuery={getStartQuery}/>
            <SelectLaunchType
              dropdownOptions={dropdownOptions}
              isOpen={isOpen}
              selected={selected}
              toggling={toggling}
            />
          </Row>
          <Row>
            <Table columns={COLUMNS} tableData={launches} openLaunchCard={openLaunchCard} loading={pending} />
          </Row>
        </Col>
      </ContentContainer>
      <LaunchCard launchDetails={launchDetails} isOpen={isLaunchCardOpen} closeModal={closeLaunchModal} />
    </>
  );
};

export default HomePage;
