import React, { useMemo } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';
import Loader from '../Loader';
import Pagination from '../Pagination';
import Text from '../Text';

const TableWrapper = styled.div`
  width: ${PxToRem(952)};
  height: ${PxToRem(676)};
  margin: 0 auto;
  table {
    font-family: Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: ${PxToRem(16)};
    font-size: ${PxToRem(13)};
    line-height: ${PxToRem(16)};
    border: 1px solid #e4e4e7;
  }

  table thead th {
    border: none;
  }

  table td,
  table th {
    padding: 12px;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    background: #f4f5f7;
    color: #4b5563;
    text-align: initial;
    width: fit-content;
  }

  tbody {
    text-align: initial;
  }
`;

const Container = styled.div`
  width: ${PxToRem(952)};
  height: ${PxToRem(676)};
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e4e7;
`;

const Table = ({ columns, tableData, openLaunchCard, loading, initialTabIndex, setPageQuery }) => {
  const data = useMemo(() => tableData || [], [tableData]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: initialTabIndex, pageSize: 12 }
    },
    usePagination,
    useRowSelect
  );
  return (
    <>
      <TableWrapper>
        <table {...getTableProps()}>
          <thead>
            {headerGroups?.map(headerGroup => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup?.headers?.map(column => {
                    return <th {...column.getHeaderProps()}>{column.render('Header')}</th>;
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!loading &&
              page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => openLaunchCard(row?.original)}>
                    {row?.cells?.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {tableData?.length === 0 && !loading && (
          <Container>
            <Text lineHeight={PxToRem(14)} fontSize={PxToRem(14)} fontWeight={500} marginTop={PxToRem(48)}>
              No results found for the specified filter
            </Text>
          </Container>
        )}
        {loading && (
          <Container>
            <Loader />
          </Container>
        )}

        <Pagination
          alignSelf='flex-end'
          pageIndex={pageIndex}
          page={pageCount}
          handlePagination={gotoPage}
          totalPages={pageOptions.length}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          setPageQuery={setPageQuery}
          canPreviousPage={canPreviousPage}></Pagination>
      </TableWrapper>
    </>
  );
};

export default Table;
