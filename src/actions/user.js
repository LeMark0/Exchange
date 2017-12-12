import { createAction } from 'redux-actions';
import { userTypes } from 'constants/actionTypes';
import api from 'api/api';
import { LOAD_USER_BALANCE_ERROR } from 'constants/errorList';

export const getBalanceRequest = createAction(userTypes.async.getBalanceRequest);
export const getBalanceSuccess = createAction(userTypes.async.getBalanceSuccess);
export const getBalanceFail = createAction(userTypes.async.getBalanceFail);

export const setBalance = createAction(
  userTypes.setBalance,
  (currency, amount) => ({ currency, amount }),
);

export const getBalance = (params) => async (dispatch) => {
  dispatch(getBalanceRequest());

  try {
    const response = await api('user.balance', params);
    dispatch(getBalanceSuccess(response.data));
  } catch (error) {
    dispatch(getBalanceFail({ ...error, message: LOAD_USER_BALANCE_ERROR }));
  }
};
