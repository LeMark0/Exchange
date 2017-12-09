import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import currencyList from 'constants/currencyList';

import { CurrencyStyled, Symbol, Value } from './styled';

export default function Currency(props) {
  const { currencyCode, value, format } = props;

  const amountString = Numeral(value).format(format);
  const currencySymbol = (currencyList[currencyCode])
    ? currencyList[currencyCode].symbol
    : '';

  return (
    <CurrencyStyled>
      <Symbol>{currencySymbol}</Symbol>
      <Value>{amountString}</Value>
    </CurrencyStyled>
  );
}

Currency.propTypes = {
  currencyCode: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  format: PropTypes.string,
};

Currency.defaultProps = {
  currencyCode: '',
  value: 0,
  format: '0,0.00',
};
