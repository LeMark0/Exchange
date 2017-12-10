export const appTypes = {
  setTest: 'APP/SET_TEST',
};

export const exchangeTypes = {
  async: {
    getLatestRatesRequest: 'EXCHANGE/ASYNC/GET_LATEST_RATES_REQUEST',
    getLatestRatesSuccess: 'EXCHANGE/ASYNC/GET_LATEST_RATES_SUCCESS',
    getLatestRatesFail: 'EXCHANGE/ASYNC/GET_LATEST_RATES_FAIL',
  },
  getLatestRatesTimerStart: 'EXCHANGE/GET_LATEST_RATES_TIMER_START',
  getLatestRatesTimerStop: 'EXCHANGE/GET_LATEST_RATES_TIMER_STOP',
  setCurrencyFrom: 'EXCHANGE/SET_CURRENCY_FROM',
  setCurrencyTo: 'EXCHANGE/SET_CURRENCY_TO',
  setAmountFrom: 'EXCHANGE/SET_AMOUNT_FROM',
  setAmountTo: 'EXCHANGE/SET_AMOUNT_TO',
  setIsReverse: 'EXCHANGE/SET_IS_REVERSE',
};

export const userTypes = {
  setBalance: 'USER/SET_BALANCE',
  async: {
    getBalanceRequest: 'USER/ASYNC/GET_BALANCE_REQUEST',
    getBalanceSuccess: 'USER/ASYNC/GET_BALANCE_SUCCESS',
    getBalanceFail: 'USER/ASYNC/GET_BALANCE_FAIL',
  },
};
