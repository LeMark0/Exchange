import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setAmountTo,
  setAmountFrom,
  setIsReverse,
  getLatestRatesPeriodicalStart,
} from 'actions/exchange';
import { getBalance as loadBalance } from 'actions/user';

import currencyList from 'constants/currencyList';
import { requestPeriod } from 'config/exchange';

import Loader from 'components/Loader';
import Currency from 'components/Currency';
import CurrencySwitcher from './CurrencySwitcher';

import {
  TopContainer,
  BottomContainer,
  ExchangeContainer,
  CurrencyInputStyled,
  ArrowDown,
  Title,
  Symbol,
  CurrencyContainer,
  Balance,
  ButtonStyled,
} from './styled';

function getSymbolByCurrency(currency) {
  return currencyList[currency].symbol;
}

function parseNumber(value) {
  const numeralValue = Numeral(value).value();
  if (numeralValue === null) {
    return 0;
  }
  return numeralValue;
}

class Exchange extends Component {
  componentDidMount() {
    const { exchangeState: { currencyFrom } } = this.props;

    this.props.loadRatesPeriodStart({
      base: currencyFrom,
      symbols: 'EUR,GBP,USD',
    });

    this.props.loadUserBalance();
  }

  render() {
    const {
      latestRatesAsyncState,
      balanceAsyncState,
      balance,
      exchangeState: {
        currencyFrom,
        currencyTo,
        amountFrom,
        amountTo,
        isReverse,
      },
    } = this.props;

    const symbolFrom = getSymbolByCurrency(currencyFrom);
    const symbolTo = getSymbolByCurrency(currencyTo);

    const isLoaded = latestRatesAsyncState.needShowData && balanceAsyncState.needShowData;
    const valueNumber = parseNumber((isReverse) ? amountTo : amountFrom);
    const convertedAmount = this.convert(valueNumber, currencyTo, currencyFrom, isReverse);
    const topValue = (isReverse) ? convertedAmount : amountFrom;
    const bottomValue = (isReverse) ? amountTo : convertedAmount;

    return (
      <ExchangeContainer>
        <TopContainer>
          <div>
            <Title>Exchange</Title>
            <CurrencySwitcher
              value={currencyFrom}
              onChange={this.handleChangeCurrencyFrom}
            />
            <CurrencyContainer>
              <Symbol>{symbolFrom}</Symbol>
              <CurrencyInputStyled
                value={topValue}
                onChange={this.handleChangeAmountFrom}
              />
            </CurrencyContainer>
            <Balance>
              <span>You have:</span>
              <Currency value={balance[currencyFrom]} currencyCode={currencyFrom} />
            </Balance>
          </div>
        </TopContainer>
        <BottomContainer>
          <div>
            <ArrowDown />
            <CurrencyContainer>
              <Symbol>{symbolTo}</Symbol>
              <CurrencyInputStyled
                value={bottomValue}
                ispositive="true"
                onChange={this.handleChangeAmountTo}
              />
            </CurrencyContainer>
            <Balance>
              <span>You have:</span>
              <Currency value={balance[currencyTo]} currencyCode={currencyFrom} />
            </Balance>
            <CurrencySwitcher
              onChange={this.handleChangeCurrencyTo}
              value={currencyTo}
            />
            <ButtonStyled
              onClick={this.handleExchange}
              isDisabled={currencyFrom === currencyTo || !isLoaded}
            >
              {this.renderButtonContent(isLoaded)}
            </ButtonStyled>
          </div>
        </BottomContainer>
      </ExchangeContainer>
    );
  }

  renderButtonContent = (isLoaded) => ((isLoaded)
    ? <div>Exchange</div>
    : <Loader />
  );

  handleExchange = () => {
    console.log('handleExchange()');
  };

  handleChangeCurrencyFrom = (value) => {
    this.props.dispatchCurrencyFrom(value);
    // need to update rates
    this.props.loadRatesPeriodStart({
      base: value,
      symbols: 'EUR,GBP,USD',
    });
  };

  handleChangeCurrencyTo = (value) => {
    this.props.dispatchCurrencyTo(value);
  };

  handleChangeAmountFrom = (value = '') => {
    const valueNumber = parseNumber(value);
    this.props.dispatchIsReverse(false);
    this.props.dispatchAmountFrom(valueNumber);
  };

  handleChangeAmountTo = (value = '') => {
    const valueNumber = parseNumber(value);
    this.props.dispatchIsReverse(true);
    this.props.dispatchAmountTo(valueNumber);
  };

  convert = (amount = 0, currencyFrom, currencyTo, isReverse = false) => {
    const { rateList } = this.props;
    const valueNumeral = Numeral(amount);
    const rateNumeral = Numeral(rateList[currencyFrom]);

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
}

Exchange.propTypes = {
  latestRatesAsyncState: PropTypes.object.isRequired,
  balanceAsyncState: PropTypes.object.isRequired,
  exchangeState: PropTypes.object.isRequired,
  rateList: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  loadRatesPeriodStart: PropTypes.func.isRequired,
  loadUserBalance: PropTypes.func.isRequired,
  dispatchAmountTo: PropTypes.func.isRequired,
  dispatchAmountFrom: PropTypes.func.isRequired,
  dispatchCurrencyTo: PropTypes.func.isRequired,
  dispatchCurrencyFrom: PropTypes.func.isRequired,
  dispatchIsReverse: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  const {
    user: {
      balance,
      async: {
        getBalance,
      },
    },
    exchange: {
      async: {
        getLatestRates,
        getLatestRates: {
          data: {
            rates = {},
          } = {},
        } = {},
      },
    },
  } = state;

  return {
    exchangeState: state.exchange,
    rateList: rates,
    balance,
    latestRatesAsyncState: getLatestRates,
    balanceAsyncState: getBalance,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadUserBalance: () => {
      dispatch(loadBalance());
    },
    loadRatesPeriodStart: (params) => {
      dispatch(getLatestRatesPeriodicalStart(params, requestPeriod));
    },
    dispatchAmountTo: (value) => {
      dispatch(setAmountTo(value));
    },
    dispatchAmountFrom: (value) => {
      dispatch(setAmountFrom(value));
    },
    dispatchCurrencyTo: (value) => {
      dispatch(setCurrencyTo(value));
    },
    dispatchCurrencyFrom: (value) => {
      dispatch(setCurrencyFrom(value));
    },
    dispatchIsReverse: (value) => {
      dispatch(setIsReverse(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
