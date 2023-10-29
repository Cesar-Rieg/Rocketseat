import styled from "styled-components";
import {DEVICE_BREAKPOINTS} from '../../styles/deviceBreakpoints';

export const Container = styled.section`
  padding: 3.2rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.COLORS.RED_200};
    display: flex;
    align-items: center;
    gap: 7px;
  }

  > small {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
  }
`;

export const Tasks = styled.div`
  border: 1px dashed  ${({ theme }) => theme.COLORS.RED_200};
  min-height: 154px;
  border-radius: 7px;
  margin-top: 16px;

  display: flex;
  gap: 1.6rem;
  padding: 24px;
  flex-wrap: wrap;

  @media(max-width: ${DEVICE_BREAKPOINTS.MD}){
    justify-content: center;
    align-items: center;
  }
`;