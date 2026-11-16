import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const LoadingBox = styled.span<{ $size?: number, $color?: string }>`
  width: ${props => props?.$size ? `${props.$size}px` : '48px'};
  height: ${props => props?.$size ? `${props.$size}px` : '48px'};
  border: ${props => (props?.$size && props?.$size <= 30)
    ? props?.$color ? `2px solid ${props?.$color}` : '2px solid #319DFF'
    : props?.$color ? `5px solid ${props?.$color}` : '5px solid #319DFF'
  };
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;


interface ILoadingProps {
  size?: number;
  color?: string;
}

const Loading = (props: ILoadingProps) => {
  const { color, size } = props;

  return (
    <LoadingBox $color={color} $size={size} />
  );
};

export default Loading;
