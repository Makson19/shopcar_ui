import React from 'react';
import styled from 'styled-components';

type AvatarSize = 'small' | 'medium' | 'large';

const sizes: Record<AvatarSize, number> = {
  small: 32,
  medium: 40,
  large: 56
};

const AvatarBox = styled.div<{ $size: number; $bgColor: string; $textColor: string }>`
  align-items: center;
  background: ${props => props.$bgColor};
  border-radius: 50%;
  color: ${props => props.$textColor};
  display: flex;
  flex-shrink: 0;
  font-size: ${props => Math.round(props.$size * 0.4)}px;
  font-weight: 500;
  height: ${props => props.$size}px;
  justify-content: center;
  line-height: 1;
  overflow: hidden;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  width: ${props => props.$size}px;
`;

interface IAvatarProps {
  initials: string;
  size?: AvatarSize;
  bgColor?: string;
  textColor?: string;
}

const Avatar = ({
  initials,
  size = 'medium',
  bgColor = '#FF5796',
  textColor = '#121212'
}: IAvatarProps) => {
  return (
    <AvatarBox
      $size={sizes[size]}
      $bgColor={bgColor}
      $textColor={textColor}
    >
      {initials}
    </AvatarBox>
  );
};

export default Avatar;
