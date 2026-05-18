import styled from 'styled-components';

export const Loading = () => {
  return (
    <SpinnerContainer>
      <div className='loading-overlay'>
        <div className='dashed-loading' />
      </div>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
