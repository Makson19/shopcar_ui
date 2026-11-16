import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div<{ $isError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > .label {
    color: #666666;
    font-size: 16px;
    font-weight: 500;
    width: fit-content;
  }

  & > .input_container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    & > .input {
      border: ${props => props?.$isError ? '1px solid red' : '1px solid #d9d9d9'};
      border-radius: 8px;
      font-size: 16px;
      height: 40px;
      outline: none;
      padding-inline: 8px;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;

      &:hover {
        border-color: ${props => props?.$isError ? 'red' : '#b3b3b3'};
      }

      &:focus {
        border-color: ${props => (props.$isError ? 'red' : 'rgba(0, 0, 0, 0.78)')};
        box-shadow: ${props =>
          props.$isError ? '0 0 0 3px rgba(220, 0, 0, 0.12)' : '0 0 0 3px rgba(0, 0, 0, 0.08)'};
      }

      &:disabled {
        background: #EAECF0;
        border-color: #d9d9d9;
      }
    }

    & > .error {
      color: red;
      font-size: 14px;
    }
  }
`;

interface InputProps {
  label?: string;
  inputProps?: React.ComponentProps<'input'>;
  error?: string;
}

const Input = (props: InputProps) => {
  const { label, inputProps, error } = props;
  const isError = Boolean(error);

  return (
    <InputBox $isError={isError}>
      {label && (
        <label
          htmlFor={inputProps?.id}
          className='label'
        >
          {label}
        </label>
      )}
      <div className='input_container'>
        <input
          {...inputProps}
          className='input'
        />

        {error && (
          <span className='error'>{error}</span>
        )}
      </div>
    </InputBox>
  );
}

export default Input;
