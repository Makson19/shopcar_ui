import styled from 'styled-components';

const LogoBox = styled.div<{ $fontSize?: string }>`
  align-items: center;
  display: flex;
  width: fit-content;

  & > span {
    font-size: ${props => props?.$fontSize || '40px'};
    font-weight: bold;
    font-style: italic;
  }

  span:first-of-type {
    color: #319DFF;
  }

  span:last-of-type {
    color: #005098;
  }
`;

interface ILogoProps {
  fontSize?: string;
}

const Logo = (props: ILogoProps) => {
  const { fontSize } = props;

  return (
    <LogoBox $fontSize={fontSize}>
      <span>Shop</span>
      <span>Car</span>
    </LogoBox>
  );
};

export default Logo;
