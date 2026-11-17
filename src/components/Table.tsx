/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

const TableWrapBox = styled.div<{ $isDimmed?: boolean }>`
  border-block: 1px solid #EEF0F4;
  opacity: ${props => (props.$isDimmed ? 0.55 : 1)};
  overflow-x: auto;
  pointer-events: ${props => (props.$isDimmed ? 'none' : 'auto')};
  transition: opacity 0.2s ease;

  & > table {
    border-collapse: collapse;
    min-width: 880px;
    width: 100%;

    & > thead > tr > th {
      border-bottom: 1px solid #EEF0F4;
      color: #666666;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 12px 16px;
      text-align: left;
      text-transform: uppercase;
      white-space: nowrap;
    }

    & > tbody > tr {
      transition: background 0.15s ease;

      &:hover {
        background: #F8FAFD;
      }

      & > td {
        border-bottom: 1px solid #F1F3F7;
        color: #121212;
        font-size: 14px;
        padding: 14px 16px;
        vertical-align: middle;
        white-space: nowrap;
      }
    }

    @media (max-width: 720px) {
      overflow-x: visible;

      & > table {
        min-width: unset;
      }

      & > table > thead {
        display: none;
      }

      & > table > tbody > tr {
        border-bottom: 1px solid #EEF0F4;
        display: block;
        padding: 8px 16px;

        &:hover {
          background: transparent;
        }

        &:last-child {
          border-bottom: none;
        }

        & > td {
          align-items: center;
          border-bottom: none;
          display: flex;
          justify-content: space-between;
          padding: 10px 0;

          &::before {
            color: #666666;
            content: attr(data-label);
            font-size: 13px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

export interface IColumn<T = any> {
  key: string;
  name: React.ReactNode;
  width?: string;
  render: (data: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'inherit';
}

interface ITableProps {
  disableEvents?: boolean;
  columns: IColumn[];
  data: any[];
}

const Table = (props: ITableProps) => {
  const {
    disableEvents,
    columns,
    data
  } = props;

  return (
    <TableWrapBox $isDimmed={disableEvents}>
      <table>
        <thead>
          <tr>
            {columns?.map((column) => {
              return (
                <th
                  key={column?.key}
                  style={{ textAlign: column?.align ?? 'left' }}
                >
                  {column?.name}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => {
            return (
              <tr key={`${row?.id}-row${index}`}>
                {columns?.map((column) => {
                  const element = column?.render(row);

                  return (
                    <td
                      key={`${column?.key}[${row?.id}-${index}]`}
                      style={{
                        width: column?.width,
                        minWidth: 0,
                      }}
                    >
                      {element}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableWrapBox>
  );
};

export default Table;
