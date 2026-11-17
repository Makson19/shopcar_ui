import styled from 'styled-components';

const BadgeBox = styled.div`
  align-items: center;
  border-radius: 999px;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  gap: 6px;
  padding: 4px 10px;

  & > .dot {
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }

  &.default {
    background: #EEF0F4;
    color: #586A84;

    & > .dot {
      background: #7D8FA9;
    }
  }

  &.success {
    background: #E6F6EC;
    color: #1E7B45;

    & > .dot {
      background: #2FAE63;
    }
  }

  &.error {
    background: #FDECEC;
    color: #B3261E;

    & > .dot {
      background: #E1554B;
    }
  }
`;

interface IBadgeProps {
  label: string;
  type?: 'success' | 'error' | 'default';
}

const Badge = (props: IBadgeProps) => {
  const {
    label,
    type = 'default'
  } = props;

  return (
    <BadgeBox className={type}>
      <span className='dot' />
      {label}
    </BadgeBox>
  );
};

export default Badge;
