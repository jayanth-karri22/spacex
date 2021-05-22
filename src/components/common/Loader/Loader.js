import styled, { keyframes } from 'styled-components';
import LoadingSpinner from '../../../assets/Icons/LoadingSpinner';
import PxToRem from '../../../utils/PxToRem';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: flex;
  justify-content: center;
  animation: ${rotate} 2s linear infinite;
  font-size: 1.2rem;
  margin-top: ${PxToRem(8)};
`;

const Loader = () => (
  <Rotate>
    <LoadingSpinner />
  </Rotate>
);

export default Loader;
