import styled from 'styled-components';
import ReactCurrencyInput from 'react-number-format';

export const CurrencyInputStyled = styled(ReactCurrencyInput)`
  color: #fff;
  border: none;
  border-bottom: 1px solid white;
  text-align: right;
  font-size: 24px;
  width: 100%;
  height: 50px;
  background: transparent;

  &:focus {
      outline: none;
  }
`;
