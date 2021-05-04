import React, { useMemo } from 'react';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';

const TableWrapper = styled.div`
  width: 100%;
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
    padding: 16px;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    align-self: center;
    background: #F4F5F7;
    color: #4B5563;
  }

  tbody{
      text-align:center;
  }
`;

const Table = ({
    columns,
    tableData,
}) => {
    const data = useMemo(() => tableData || [], [tableData]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
    } = useTable(
        {
            columns,
            data
        },
        useSortBy,
        usePagination,
        useRowSelect
    );
    return (
        <TableWrapper>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups?.map(headerGroup => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup?.headers?.map((column) => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                            <tr {...row.getRowProps()}>
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
        </TableWrapper>
    );
};

export default Table;