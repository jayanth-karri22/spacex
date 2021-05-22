import styled from 'styled-components';
import PxToRem from '../../../utils/PxToRem';

const StyledText = styled.p`
  font-family: Helvetica Neue, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: ${PxToRem(24)};
  width: fit-content;
`;

const Text = ({
  children,
  fontSize = PxToRem(12),
  color = '#03543F',
  fontWeight = 500,
  textAlign = 'center',
  lineHeight = PxToRem(13),
  style,
  width = 'auto',
  ...rest
}) => {
  return (
    <StyledText
      style={{
        fontSize,
        color,
        width,
        fontWeight,
        textAlign,
        lineHeight,
        ...style,
        ...rest
      }}>
      {children}
    </StyledText>
  );
};

export default Text;
