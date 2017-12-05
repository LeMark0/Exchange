import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import { userTypes } from 'constants/actionTypes';
import { AsyncState, prepareStateRequest, prepareStateSuccess, prepareStateFail } from 'objects/AsyncState';

const initialState = immutable.from({
  balance: {
    USD: 0,
    EUR: 0,
    GBP: 0,
  },
  async: {
    getBalance: new AsyncState(),
  },
});

export default handleActions({
  [userTypes.async.getBalanceRequest]: (state) => immutable.merge(state, {
    async: {
      getBalance: prepareStateRequest(state.async.getBalance),
    },
  }, { deep: true }),
  [userTypes.async.getBalanceSuccess]: (state, action) => immutable.merge(state, {
    async: {
      getBalance: prepareStateSuccess(state.async.getBalance, action.payload),
    },
    balance: action.payload, // set initial balance
  }, { deep: true }),
  [userTypes.async.getBalanceFail]: (state, action) => immutable.merge(state, {
    async: {
      getBalance: prepareStateFail(state.async.getBalance, action.payload),
    },
  }, { deep: true }),

}, initialState);
