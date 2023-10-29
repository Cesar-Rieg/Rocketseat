import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  
  border-radius: 0.7rem;
  
  > input {
    height: 5.6rem;
    width: 100%;
    font-size: 1.6rem;
    padding: 1.2rem;
    
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    background: transparent;
    border: 0;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }
  }
  
  > svg {
    margin-left: 1.6rem;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.COLORS.GRAY_400};
  }
`;