import { createAction } from 'redux-actions';
import { exchangeTypes } from 'constants/actionTypes';
import api from 'api/api';

export const getLatestRatesRequest = createAction(exchangeTypes.async.getLatestRatesRequest);
export const getLatestRatesSuccess = createAction(exchangeTypes.async.getLatestRatesSuccess);
export const getLatestRatesFail = createAction(exchangeTypes.async.getLatestRatesFail);

export const getLatestRatesTimerStart = createAction(exchangeTypes.getLatestRatesTimerStart);
export const getLatestRatesTimerStop = createAction(exchangeTypes.getLatestRatesTimerStop);

export const setCurrencyFrom = createAction(exchangeTypes.setCurrencyFrom);
export const setCurrencyTo = createAction(exchangeTypes.setCurrencyTo);
export const setAmountTo = createAction(exchangeTypes.setAmountTo);
export const setAmountFrom = createAction(exchangeTypes.setAmountFrom);
export const setIsReverse = createAction(exchangeTypes.setIsReverse);

export const getLatestRates = (params) => async (dispatch) => {
  dispatch(getLatestRatesRequest());

  try {
    const response = await api('currency.latest', params);
    dispatch(getLatestRatesSuccess(response.data));
  } catch (error) {
    dispatch(getLatestRatesFail(error));
  }
};

let rateTimer = null;
export const getLatestRatesPeriodicalStop = () => (dispatch) => {
  clearInterval(rateTimer);
  dispatch(getLatestRatesTimerStop());
};

export const getLatestRatesPeriodicalStart = (params, period = 10000) => (dispatch) => {
  dispatch(getLatestRatesPeriodicalStop());

  dispatch(getLatestRatesTimerStart(period));
  dispatch(getLatestRates(params));

  rateTimer = setInterval(() => dispatch(getLatestRates(params)), period);
};
