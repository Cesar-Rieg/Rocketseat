import styled from 'styled-components';

export const Container = styled.button`
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  height: 44px;
  border: 0;
  padding: 0 1.6rem;
  border-radius: .7rem;
  font-size: 1.4rem;
  
  display: flex;
  align-items: center;
  gap: 7px;

  > svg {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.COLORS.RED_200};
  }
`;