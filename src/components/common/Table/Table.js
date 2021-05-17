import React, { useMemo } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';
import Pagination from '../Pagination';

const TableWrapper = styled.div`
  width: ${PxToRem(952)};
  height: ${PxToRem(676)};
  margin:0 auto;
  table {
    font-family: Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: ${PxToRem(16)};
    font-size: ${PxToRem(13)};
    line-height: ${PxToRem(16)};
    border:1px solid #E4E4E7;
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
    background: #F4F5F7;
    color: #4B5563;
    text-align: initial;
    width:fit-content;
  }

  tbody{
      text-align: initial;
  }
`;

const Table = ({
    columns,
    tableData,
    openLaunchCard
}) => {
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
            initialState: { pageIndex: 0, pageSize: 12 }
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
                                    {headerGroup?.headers?.map((column) => {
                                        return (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} onClick={() => openLaunchCard(row?.original)}>
                                    {row?.cells?.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    alignSelf='flex-end'
                    pageIndex={pageIndex}
                    page={pageCount}
                    handlePagination={gotoPage}
                    totalPages={pageOptions.length}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    canNextPage={canNextPage}
                    canPreviousPage={canPreviousPage}>
                </Pagination>
            </TableWrapper>
        </>
    );
};

export default Table;