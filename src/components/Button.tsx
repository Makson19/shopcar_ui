import React from 'react';
import styled from 'styled-components';

const ButtonBox = styled.button<{ $bgColor?: string, $textColor?: string, $fullWidth?: boolean }>`
  align-items: center;
  background: ${props => props?.$bgColor || '#319DFF'};
  border: none;
  border-radius: 8px;
  color: ${props => props?.$textColor || '#FFFFFF'};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  gap: 8px;
  height: 40px;
  justify-content: center;
  min-width: 144px;
  padding: 8px 16px;
  transition: filter 0.3s ease-in-out;
  width: ${props => props?.$fullWidth ? '100%' : 'auto'};

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(70%);
  },

  & > .btn_icon {
    height: 16px;
    width: 16px;

    & > svg: {
      height: 100%;
      width: 100%;
    }
  }
`;

interface IButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  textColor?: string;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  iconProps?: React.ComponentProps<'svg'>;
  fullWidth?: boolean;
}

const Button = (props: IButtonProps) => {
  const {
    children,
    type = 'button',
    bgColor,
    textColor,
    startIcon: StartIcon,
    endIcon: EndIcon,
    iconProps,
    fullWidth
  } = props;

  return (
    <ButtonBox
      type={type}
      $bgColor={bgColor}
      $textColor={textColor}
      $fullWidth={fullWidth}
    >
      {StartIcon && (
        <div className='btn_icon'>
          <StartIcon {...iconProps} />
        </div>
      )}
      {children}
      {EndIcon && (
        <div className='btn_icon'>
          <EndIcon {...iconProps} />
        </div>
      )}
    </ButtonBox>
  );
};

export default Button;
