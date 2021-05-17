import styled from 'styled-components';
import Next from '../../../assets/Icons/Next';
import Previous from '../../../assets/Icons/Previous';
import PxToRem from '../../../utils/PxToRem';
import Text from '../Text';

const PaginationWrapper = styled.div`
display: flex;
width:fit-content;
height:fit-content;
border: 1px solid #E4E4E7;
margin-top: ${PxToRem(12)};
border-radius: ${PxToRem(6)};
float:right;
`;

const PageItem = styled.button`
background: #fff;
box-sizing: border-box;
border:none;
border-right:1px solid #E4E4E7;
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
        <PaginationWrapper>
            <PageItem borderRadius={PxToRem(26)} disabled={!canPreviousPage} onClick={previousPage}>
                <Previous />
            </PageItem>
            {
                totalPages > pageIndex + 1 &&
                <PageItem onClick={() => handlePagination(pageIndex)}>
                    <Text>{pageIndex + 1}</Text>
                </PageItem>
            }
            {
                totalPages > pageIndex + 2 &&
                <PageItem onClick={() => handlePagination(pageIndex + 1)}>
                    <Text>{pageIndex + 2}</Text>
                </PageItem>
            }
            {
                pageIndex + 3 < totalPages &&
                <PageItem onClick={() => handlePagination(pageIndex)}>
                    <Text >...</Text>
                </PageItem>
            }
            {
                <PageItem onClick={() => handlePagination(totalPages - 1)}>
                    <Text >{totalPages}</Text>
                </PageItem>
            }
            <PageItem disabled={!canNextPage} onClick={nextPage}>
                <Next />
            </PageItem>
        </PaginationWrapper>
    )
}

export default Pagination;