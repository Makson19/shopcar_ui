import React from 'react';
import styled from 'styled-components';

const getOutlinedColor = (props: { $bgColor?: string, $textColor?: string }) =>
  props?.$bgColor || props?.$textColor || '#319DFF';

const ButtonBox = styled.button<{ $bgColor?: string, $textColor?: string, $fullWidth?: boolean, $variant?: 'contained' | 'outlined' }>`
  align-items: center;
  background: ${props => (props?.$variant === 'outlined' ? 'transparent' : props?.$bgColor || '#319DFF')};
  border: ${props => (props?.$variant === 'outlined' ? `1px solid ${getOutlinedColor(props)}` : 'none')};
  border-radius: 8px;
  color: ${props => (props?.$variant === 'outlined' ? getOutlinedColor(props) : props?.$textColor || '#FFFFFF')};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  gap: 8px;
  height: 40px;
  justify-content: center;
  min-width: 144px;
  padding: 8px 16px;
  transition: filter 0.3s ease-in-out, background 0.3s ease-in-out;
  width: ${props => props?.$fullWidth ? '100%' : 'auto'};

  &:hover {
    background: ${props => props.$variant === 'outlined' ? '#EEF0F4' : (props?.$bgColor || '#319DFF')};
    filter: brightness(85%);
  }

  &:active {
    background: ${props => props?.$variant === 'outlined' ? '#DDE1E8' : (props?.$bgColor || '#319DFF')};
    filter: brightness(70%);
  }

  & > .btn_icon {
    height: 16px;
    width: 16px;

    & > svg {
      height: 100%;
      width: 100%;
    }
  }
`;

interface IButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void; 
  variant?: 'contained' | 'outlined';
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
    onClick,
    variant = 'contained',
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
      $variant={variant}
      $bgColor={bgColor}
      $textColor={textColor}
      $fullWidth={fullWidth}
      onClick={onClick}
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
