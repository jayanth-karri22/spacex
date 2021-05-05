import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  width:100%;
`;

const Row = ({
    children,
    justifyContent = 'flex-start',
    alignItems = 'center',
    style,
    ...rest
}) => {
    return (
        <StyledRow style={{ justifyContent, alignItems, ...style, ...rest }}>
            {children}
        </StyledRow>
    );
};

export default Row;
