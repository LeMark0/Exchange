import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';
// import Numeral from 'numeral';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setAmountTo,
  setAmountFrom,
  getLatestRatesPeriodicalStart,
  getLatestRatesPeriodicalStop,
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

/*
* TODO convert input data to appropriate type
*
* */

class Exchange extends Component {
  componentDidMount() {
    const { exchangeState: { currencyFrom } } = this.props;

    this.props.getRatesPeriodStart({
      base: currencyFrom,
      symbols: 'EUR,GBP,USD',
    });

    this.props.getUserBalance();
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
        // amountTo,
      },
    } = this.props;

    console.log('latestRatesAsyncState: ', latestRatesAsyncState);
    console.log('balanceAsyncState: ', balanceAsyncState);

    const symbolFrom = this.getSymbolByCurrency(currencyFrom);
    const symbolTo = this.getSymbolByCurrency(currencyTo);

    return (latestRatesAsyncState.needShowData && balanceAsyncState.needShowData)
      ?
        <ExchangeContainer>
          <TopContainer>
            <div>
              <Title>Exchange</Title>
              <CurrencySwitcher
                value={currencyFrom}
                onChange={(value) => this.handleChangeCurrency('currencyFrom', value)}
              />
              <CurrencyContainer>
                <Symbol>{symbolFrom}</Symbol>
                <CurrencyInputStyled
                  value={amountFrom}
                  prefix={(amountFrom > 0) ? '- ' : ''}
                  onChange={(value) => this.handleChangeAmountTo(value)}
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
                  value={0}
                  onChange={(value) => this.handleChangeAmountTo(value)}
                />
              </CurrencyContainer>
              <Balance>
                <span>You have:</span>
                <Currency value={balance[currencyTo]} currencyCode={currencyFrom} />
              </Balance>
              <CurrencySwitcher
                onChange={(value) => this.handleChangeCurrency('currencyTo', value)}
                value={currencyTo}
              />
              <ButtonStyled
                onClick={this.handleExchange}
                isDisabled={currencyFrom === currencyTo}
              >
                Exchange
              </ButtonStyled>
            </div>
          </BottomContainer>
        </ExchangeContainer>
      :
        <Loader />;
  }

  handleExchange = () => {
    console.log('handleExchange()');


  };

  handleChange(alias, value) {
    console.log('Exchange onChange: ', alias, value);
    this.setState({
      [alias]: value,
    });
  }

  handleChangeCurrency(alias, value) {
    if (alias === 'currencyFrom') {
      this.props.setCurrencyFrom(value);
      // need to update rates
      this.getRatesPeriodStart({
        base: value,
        symbols: 'EUR,GBP,USD',
      });
    }

    if (alias === 'currencyTo') {
      this.props.setCurrencyTo(value);
    }
  }

  handleChangeAmountFrom(value) {
    // TODO make a number!
    value = value.toString().replace(/\s|\-/g, '');

    this.props.setAmountFrom(value);
  }

  handleChangeAmountTo(value) {
    // TODO make a Decimal and dispatch string!
    console.log('handleChangeAmountTo: ', value);
    const { exchangeState: { currencyFrom, currencyTo } } = this.props;

    const convertedAmount = this.convert(value, currencyTo, currencyFrom, true);

    this.props.setAmountTo(value);
    this.props.setAmountFrom(convertedAmount.toString());
  }

  getSymbolByCurrency(currency) {

    return currencyList[currency].symbol;
  }

  convert(amount = 0, currencyFrom, currencyTo, isRevese = false) {
    amount = amount.toString().replace(/\s/g, '');

    if (currencyFrom === currencyTo) {

      return amount;
    }

    const { rateList } = this.props;

    if (isRevese === true) {
      let rate = rateList[currencyFrom];
      return Decimal(amount).div(Decimal(rate));
    }

    let rate = rateList[currencyTo];
    console.log('convert amount, rate: ', amount, rate);

    return Decimal(amount).mul(Decimal(rate));
  }
}

Exchange.propTypes = {
  exchangeState: PropTypes.object.isRequired,
  latestRatesAsyncState: PropTypes.object.isRequired,
  balanceAsyncState: PropTypes.object.isRequired,
  rateList: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
  getRatesPeriodStart: PropTypes.func.isRequired,
  // getRatesPeriodStop: PropTypes.func.isRequired,
  setAmountTo: PropTypes.func.isRequired,
  setAmountFrom: PropTypes.func.isRequired,
  setCurrencyTo: PropTypes.func.isRequired,
  setCurrencyFrom: PropTypes.func.isRequired,
  getUserBalance: PropTypes.func.isRequired,
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
    getUserBalance: () => {
      dispatch(loadBalance());
    },
    getRatesPeriodStart: (params) => {
      dispatch(getLatestRatesPeriodicalStart(params, requestPeriod));
    },
    getRatesPeriodStop: () => {
      dispatch(getLatestRatesPeriodicalStop());
    },
    setAmountTo: (value) => {
      dispatch(setAmountTo(value));
    },
    setAmountFrom: (value) => {
      dispatch(setAmountFrom(value));
    },
    setCurrencyTo: (value) => {
      dispatch(setCurrencyTo(value));
    },
    setCurrencyFrom: (value) => {
      dispatch(setCurrencyFrom(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
