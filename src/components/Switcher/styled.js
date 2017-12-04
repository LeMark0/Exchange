import styled from 'styled-components';

export const SwitcherStyled = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.orientation === 'vertical' ? 'column' : 'row')};
`;
