import styled from 'styled-components';

export const ButtonStyled = styled.button`
  height: 50px;
  width: 150px;
  border: none;
  border-radius: 5px;
  background-color: #105a8e;
  color: ${(props) => (props.disabled ? '#a0a0a0' : '#fff')};
  outline: 0;
  transition: background-color 200ms;
  
  &:not(${(props) => !props.disabled}):hover {
    background-color: #58a9e2;
    cursor: pointer;
  }
`;
