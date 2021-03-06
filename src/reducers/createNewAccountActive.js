import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  result: null,
  errors: null
}

export default function createNewAccountActive(state=initialState, action) {
  switch(action.type) {
    case types.CREATE_NEW_ACCOUNT_ACTIVE_PROCESSING:
      return {
        ...state,
        status: 'processing',
        result: null,
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ACTIVE_DONE:
      return {
        ...state,
        status: 'done',
        result: action.data || '',
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ACTIVE_ERROR:
      return {
        ...state,
        status: 'error',
        result: null,
        errors: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
