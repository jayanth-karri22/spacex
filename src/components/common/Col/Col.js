import React from 'react';
import styled from 'styled-components';

const StyledCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
`;

const Col = ({
    children,
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    style,
    ...rest
}) => {
    return (
        <StyledCol style={{ justifyContent, alignItems, ...style, ...rest }}>
            {children}
        </StyledCol>
    );
};

export default Col;