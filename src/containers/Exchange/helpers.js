import Numeral from 'numeral';
import currencyList from 'constants/currencyList';

export function getSymbolByCurrency(currency) {
  return currencyList[currency].symbol;
}

export function parseNumber(value) {
  const numeralValue = Numeral(value).value();
  if (numeralValue === null) {
    return 0;
  }
  return numeralValue;
}

export function convertCurrency(amount = 0, currencyFrom, currencyTo, rate = 1, isReverse = false) {
  const valueNumeral = Numeral(amount);
  const rateNumeral = Numeral(rate);

  if (currencyFrom === currencyTo) {
    // no need to convert
    return valueNumeral.value();
  }

  if (isReverse === true) {
    return valueNumeral
      .divide(rateNumeral.value())
      .value();
  }

  return valueNumeral
    .multiply(rateNumeral.value())
    .value();
}
