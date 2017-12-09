import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import { exchangeTypes } from 'constants/actionTypes';
import { AsyncState, prepareStateRequest, prepareStateSuccess, prepareStateFail } from 'objects/AsyncState';
import currencyList from 'constants/currencyList';

const initialState = immutable.from({
  currencyFrom: currencyList.USD.code,
  currencyTo: currencyList.GBP.code,
  amountFrom: 0,
  amountTo: 0,
  isReverse: false,
  async: {
    getLatestRates: new AsyncState(),
  },
});

export default handleActions({
  [exchangeTypes.async.getLatestRatesRequest]: (state) => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateRequest(state.async.getLatestRates),
    },
  }, { deep: true }),
  [exchangeTypes.async.getLatestRatesSuccess]: (state, action) => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateSuccess(state.async.getLatestRates, action.payload),
    },
  }, { deep: true }),
  [exchangeTypes.async.getLatestRatesFail]: (state, action) => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateFail(state.async.getLatestRates, action.payload),
    },
  }, { deep: true }),

  [exchangeTypes.setCurrencyFrom]: (state, action) => immutable.set(
    state,
    'currencyFrom',
    action.payload,
  ),
  [exchangeTypes.setCurrencyTo]: (state, action) => immutable.set(
    state,
    'currencyTo',
    action.payload,
  ),
  [exchangeTypes.setAmountFrom]: (state, action) => immutable.set(
    state,
    'amountFrom',
    action.payload,
  ),
  [exchangeTypes.setAmountTo]: (state, action) => immutable.set(
    state,
    'amountTo',
    action.payload,
  ),

  [exchangeTypes.setIsReverse]: (state, action) => immutable.set(
    state,
    'isReverse',
    action.payload,
  ),

}, initialState);
