import styled from 'styled-components';
import Next from '../../../assets/Icons/Next';
import Previous from '../../../assets/Icons/Previous';
import PxToRem from '../../../utils/PxToRem';
import Text from '../Text';

const PaginationWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  border: 1px solid #e4e4e7;
  margin-top: ${PxToRem(12)};
  border-radius: ${PxToRem(6)};
  float: right;
`;

const PageItem = styled.button`
  background: #fff;
  box-sizing: border-box;
  border: none;
  border-right: 1px solid #e4e4e7;
  height: ${PxToRem(40)};
  width: ${PxToRem(40)};
  color: #4b5563;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActivePageItem = styled(PageItem)`
  color: black;
`;

const Pagination = ({
  alignSelf,
  handlePagination,
  pageIndex,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  totalPages,
  setPageQuery
}) => {
  return (
    <PaginationWrapper>
      <PageItem borderRadius={PxToRem(26)} disabled={!canPreviousPage} onClick={()=> [previousPage(), setPageQuery(pageIndex-1)]}>
        <Previous />
      </PageItem>
      {totalPages > pageIndex + 1 && (
        <PageItem onClick={() => [handlePagination(pageIndex), setPageQuery(pageIndex)]}>
          <Text>{pageIndex + 1}</Text>
        </PageItem>
      )}
      {totalPages > pageIndex + 2 && (
        <PageItem onClick={() => [handlePagination(pageIndex + 1), setPageQuery(pageIndex + 1)]}>
          <Text>{pageIndex + 2}</Text>
        </PageItem>
      )}
      {pageIndex + 3 < totalPages && (
        <PageItem onClick={() => [handlePagination(pageIndex), setPageQuery(pageIndex)]}>
          <Text>...</Text>
        </PageItem>
      )}
      {
        <PageItem onClick={() => [handlePagination(totalPages - 1), setPageQuery(totalPages-1)]}>
          <Text>{totalPages}</Text>
        </PageItem>
      }
      <PageItem disabled={!canNextPage} onClick={()=> [nextPage(), setPageQuery(pageIndex+1)]}>
        <Next />
      </PageItem>
    </PaginationWrapper>
  );
};

export default Pagination;
