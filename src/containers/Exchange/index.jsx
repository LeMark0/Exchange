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

import { getBalance as loadBalance, setBalance } from 'actions/user';
import { requestPeriod } from 'config/exchange';

import Loader from 'components/Loader';
import Currency from 'components/Currency';
import CurrencySwitcher from './CurrencySwitcher';
import { getSymbolByCurrency, convertCurrency, parseNumber } from './helpers';

import {
  TopContainer,
  BottomContainer,
  ExchangeContainer,
  FieldContainer,
  CurrencyInputStyled,
  ArrowDown,
  Title,
  Symbol,
  CurrencyContainer,
  Balance,
  ButtonStyled,
  ErrorList,
  ErrorItem,
} from './styled';

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
      rateList,
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
    const isLoading = latestRatesAsyncState.needShowLoader || balanceAsyncState.needShowLoader;
    const valueNumber = parseNumber((isReverse) ? amountTo : amountFrom);

    const convertedAmount = convertCurrency(
      valueNumber,
      currencyTo,
      currencyFrom,
      rateList[currencyTo],
      isReverse,
    );
    const topValue = (isReverse) ? convertedAmount : amountFrom;
    const bottomValue = (isReverse) ? amountTo : convertedAmount;
    const isEnoughMoney = topValue <= balance[currencyFrom];

    const isValid = isLoaded
      && convertedAmount
      && isEnoughMoney
      && currencyFrom !== currencyTo;

    return (
      <ExchangeContainer>
        <TopContainer>
          <FieldContainer>
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
            <Balance error={!isEnoughMoney}>
              <span>You have:</span>
              <Currency
                value={balance[currencyFrom]}
                currencyCode={currencyFrom}
              />
            </Balance>
          </FieldContainer>
        </TopContainer>
        <BottomContainer>
          <FieldContainer>
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
              <Currency value={balance[currencyTo]} currencyCode={currencyTo} />
            </Balance>
            <CurrencySwitcher
              onChange={this.handleChangeCurrencyTo}
              value={currencyTo}
            />
            <ButtonStyled
              onClick={() => this.handleExchange(convertedAmount)}
              isDisabled={!isValid}
            >
              {this.renderButtonContent(!isLoading)}
            </ButtonStyled>
            {this.renderError()}
          </FieldContainer>
        </BottomContainer>
      </ExchangeContainer>
    );
  }

  renderButtonContent = (isLoaded) => ((isLoaded)
    ? <div>Exchange</div>
    : <Loader />
  );

  renderError = () => {
    const { latestRatesAsyncState, balanceAsyncState } = this.props;
    const asyncList = [latestRatesAsyncState, balanceAsyncState];
    const errorList = asyncList.reduce((acc, curr) => {
      if (curr.needShowError) {
        acc = [
          ...acc,
          {
            message: curr.error.message,
            url: curr.error.config.url,
          },
        ];
      }

      return acc;
    }, []);

    return (
      <ErrorList>
        {
          errorList.map((item) => <ErrorItem key={item.url}>{item.message}</ErrorItem>)
        }
      </ErrorList>
    );
  };

  handleExchange = (convertedAmount) => {
    const {
      currencyFrom,
      currencyTo,
      amountFrom,
    } = this.props.exchangeState;
    const { balance } = this.props;

    this.props.dispatchBalance(
      currencyFrom,
      Numeral(balance[currencyFrom])
        .subtract(Numeral(amountFrom).value())
        .value(),
    );
    this.props.dispatchBalance(
      currencyTo,
      Numeral(balance[currencyTo])
        .add(Numeral(convertedAmount).value())
        .value(),
    );
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
  dispatchBalance: PropTypes.func.isRequired,
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
        },
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
    dispatchBalance: (currency, amount) => {
      dispatch(setBalance(currency, amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
