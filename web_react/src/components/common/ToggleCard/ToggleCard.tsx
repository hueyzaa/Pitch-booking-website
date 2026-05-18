import styled from 'styled-components';

export const ToggleCard = styled.div`
  border: 1px solid var(--border-base-color);
  border-radius: 6px;
  padding: 0 0.75rem;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--text-main-color);
  font-weight: 400;
  background-color: var(--background-color);

  span {
    font-size: 13px;
  }
`;

export default ToggleCard;
