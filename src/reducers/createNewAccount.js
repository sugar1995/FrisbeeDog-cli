import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  mnemonic: '',
  wid: '',
  errors: null
}

export default function createNewAccount(state=initialState, action) {
  switch(action.type) {
    case types.CREATE_NEW_ACCOUNT_PROCESSING:
      return {
        ...state,
        status: 'processing',
        mnemonic: '',
        wid: '',
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_DONE:
      return {
        ...state,
        status: 'done',
        mnemonic: action.data['mnemonic'] || '',
        wid: action.data['mnemonic'] || '',
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ERROR:
      return {
        ...state,
        status: 'error',
        mnemonic: '',
        wid: '',
        errors: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
