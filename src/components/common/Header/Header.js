import React from 'react';
import styled from 'styled-components';
import MainLogo from '../../../assets/Icons/MainLogo';
import PxToRem from '../../../utils/PxToRem';

const HeaderContainer = styled.div`
    width: 100%;
    height: ${PxToRem(72)};
    display:flex;
    background: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
`

const Header = () => {
    return (
        <HeaderContainer>
            <MainLogo />
        </HeaderContainer>
    )
}

export default Header;