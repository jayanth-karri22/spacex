import styled from 'styled-components';
import Next from '../../../assets/Icons/Next';
import Previous from '../../../assets/Icons/Previous';
import PxToRem from '../../../utils/PxToRem';
import Text from '../Text';

const PaginationWrapper = styled.div`
padding: ${PxToRem(32)} 0;
display: flex;
justify-content: center;
`;

const PageItem = styled.button`
background: #fff;
border: 1px solid #E4E4E7;;
box-sizing: border-box;
border-radius: 1px;
height: ${PxToRem(40)};
width: ${PxToRem(40)};
color: #4B5563;
outline: none;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-radius:4px;
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

const ActivePageItem = styled(PageItem)`
  color:black;
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
}) => {
    return (
        <PaginationWrapper style={{ justifyContent: alignSelf }}>
            <PageItem borderRadius={PxToRem(26)} data-testid='test_previous' disabled={!canPreviousPage} onClick={previousPage}>
                <Previous />
            </PageItem>
            {
                totalPages > pageIndex + 1 &&
                <PageItem data-testid='test_active_page_item' onClick={() => handlePagination(pageIndex)}>
                    <Text>{pageIndex + 1}</Text>
                </PageItem>
            }
            {
                totalPages > pageIndex + 2 &&
                <PageItem data-testid='test_active_page_item' onClick={() => handlePagination(pageIndex + 1)}>
                    <Text>{pageIndex + 2}</Text>
                </PageItem>
            }
            {
                pageIndex + 3 < totalPages &&
                <PageItem data-testid='test_active_page_item' onClick={() => handlePagination(pageIndex)}>
                    <Text >...</Text>
                </PageItem>
            }
            {
                <PageItem data-testid='test_active_page_item' onClick={() => handlePagination(totalPages - 1)}>
                    <Text >{totalPages}</Text>
                </PageItem>
            }
            <PageItem data-testid='test_next' disabled={!canNextPage} onClick={nextPage}>
                <Next />
            </PageItem>
        </PaginationWrapper>
    )
}

export default Pagination;