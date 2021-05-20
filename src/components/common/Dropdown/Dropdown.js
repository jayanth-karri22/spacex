import React from 'react';
import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';
import Text from '../Text';

const DropDownContainer = styled('div')`
  width: ${PxToRem(170)};
  height: ${PxToRem(30)};
`;

const DropDownHeader = styled('div')`
  cursor: pointer;
  display: flex;
  font-family: Helvetica Neue, sans-serif;
  flex-direction: row;
  box-sizing: border-box;
  padding: ${PxToRem(4)} ${PxToRem(8)};
  fontsize: ${PxToRem(16)};
  font-weight: 500;
  lineheight: ${PxToRem(16)};
  letterspacing: -0.01em;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropDownListContainer = styled('div')`
  width: ${PxToRem(170)};
  height: ${PxToRem(128)};
`;
const DropDownList = styled('ul')`
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
  border-radius: 1px;
  color: #212529 !important;
  font-size: ${PxToRem(16)};
  line-height: ${PxToRem(16)};
  position: relative;
  z-index: 10;
  left: ${PxToRem(10)};
  padding: 0px;
`;

const ListItem = styled('li')`
  list-style: none;
  cursor: pointer;
  font-family: Helvetica Neue, sans-serif;
  white-space: nowrap;
  font-size: 14px;
  line-height: 14px;
  padding: 8px 16px;
  box-sizing: border-box;
  color: #1f2937;
  :first-child {
    padding-top: 8px;
  }

  :last-child {
    padding-bottom: 8px;
  }

  a {
    width: 100%;
    height: 100%;
    display: block;
    text-align: left;
    padding: 4px 0px;
    box-sizing: border-box;
    font-family: Helvetica Neue, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }

  a:visited {
    color: black;
  }

  a:hover,
  a:visited,
  :hover,
  :visited {
    background: #f4f5f7;
    color: #1f2937;
    cursor: pointer;
  }
`;

const Dropdown = ({ options, selected, toggling, isOpen, ...rest }) => {
  return (
    <DropDownContainer style={{ ...rest }} isOpen={isOpen}>
      <DropDownHeader style={{ ...rest }} onClick={e => toggling(e, selected)}>
        <div>
          <Text
            whiteSpace='nowrap'
            display='inline-block'
            textOverflow='ellipsis'
            overflow='hidden'
            fontSize={PxToRem(16)}
            lineHeight={PxToRem(21)}>
            {selected}
          </Text>
        </div>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option, idx) => {
              return (
                <ListItem key={idx}>
                  <a
                    onClick={e => toggling(e, option)}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      textDecoration: 'none'
                    }}>
                    {option}
                  </a>
                </ListItem>
              );
            })}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
