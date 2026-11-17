import React from 'react';
import styled from 'styled-components';
import { Pagination as PaginationComponent } from '@mui/material';

const PaginationBox = styled.div`
  & > .pagination {
    & .Mui-selected {
      background-color: #319dff;
      color: #ffffff;

      &:hover {
        background-color: #319dff;
        filter: brightness(85%);
      }
    }
  }
`;

interface IPaginationProps {
  size?: 'large' | 'medium' | 'small';
  count?: number;
  page?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  disabled?: boolean;
  shape?: 'circular' | 'rounded';
}

const Pagination = (props: IPaginationProps) => {
  const {
    count,
    disabled,
    onChange,
    page,
    showFirstButton,
    showLastButton,
    shape = 'circular',
    size = 'medium'
  } = props;

  return (
    <PaginationBox>
      <PaginationComponent
        className='pagination'
        shape={shape}
        size={size}
        count={count}
        page={page}
        onChange={onChange}
        siblingCount={1}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        disabled={disabled}
      />
    </PaginationBox>
  );
};

export default Pagination;
