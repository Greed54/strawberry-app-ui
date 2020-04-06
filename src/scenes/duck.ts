import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { message } from 'antd';

const actionCreator = actionCreatorFactory('global');

const ERROR = 'ERROR';
const WARNING = 'WARNING';
const INFO = 'INFO';
const SUCCESS = 'SUCCESS';
const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
const ON_LOGIN = 'ON_LOGIN';
const UPDATE_USER_PREFERENCE = 'UPDATE_USER_PREFERENCE';

export const actions = {
  error: actionCreator<any>(ERROR),
  warning: actionCreator<any>(WARNING),
  info: actionCreator<any>(INFO),
  success: actionCreator<any>(SUCCESS),
  notificationShow: actionCreator<any>(NOTIFICATION_SHOW),
  // onLogin: actionCreator.async<KeycloakProfile, ExtendedUser, Error>(ON_LOGIN),
};

const TYPE = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export interface GlobalStore {
  notificationMap: any;
  // user: ExtendedUser;
}

const initialState = {
  notificationMap: undefined,
};

export default reducerWithInitialState<GlobalStore>(initialState)
.case(actions.notificationShow, (state, data) => ({
  ...state,
  notificationMap: data.notification,
}));

const getPayload = (type: string, message: any) => {
  const time = new Date().toISOString();
  const notification = [{ type, message, time }];
  return { notification };
};

const getPayloadBulk = (type: string, messages: any[]) => {
  const time = new Date().toISOString();
  const notification = messages.map(message => ({ type, message, time }));
  return { notification };
};

export function* globalErrorHandler(gen: () => any) {
  try {
    yield* gen();
  } catch (e) {
    if (e.response && e.response.status === 'error code') {
      console.log('Response with special error code'); // eslint-disable-line  no-console
    } else {
      yield put(actions.error(e));
    }
  }
}

function* handleError(action: { payload: { message: any; }; }) {
  const {
    payload: { message },
  } = action;
  if (Array.isArray(message)) {
    yield put(actions.notificationShow(getPayloadBulk(TYPE.ERROR, message)));
    message.forEach(x => {
      console.error(x);
    });
  } else {
    yield put(actions.notificationShow(getPayload(TYPE.ERROR, message)));
    console.error(message);
  }
}

function* handleWarning(action: { payload: { message: any; }; }) {
  const {
    payload: { message },
  } = action;
  if (Array.isArray(message)) {
    yield put(actions.notificationShow(getPayloadBulk(TYPE.WARNING, message)));
    message.forEach(x => {
      console.warn(x);
    });
  } else {
    yield put(actions.notificationShow(getPayload(TYPE.WARNING, message)));
    console.warn(message);
  }
}

function* handleInfo(action: { payload: { message: any; }; }) {
  const {
    payload: { message },
  } = action;
  if (Array.isArray(message)) {
    yield put(actions.notificationShow(getPayloadBulk(TYPE.INFO, message)));
  } else {
    yield put(actions.notificationShow(getPayload(TYPE.INFO, message)));
  }
}

function* handleSuccess(action: { payload: { message: any; }; }) {
  const {
    payload: { message },
  } = action;
  if (Array.isArray(message)) {
    yield put(actions.notificationShow(getPayloadBulk(TYPE.SUCCESS, message)));
  } else {
    yield put(actions.notificationShow(getPayload(TYPE.SUCCESS, message)));
  }
}

export function* saga() {
  // @ts-ignore
  yield takeEvery(actions.error.type, handleError); // no "safe" here to avoid recursion.
  // @ts-ignore
  yield takeEvery(actions.warning.type, handleWarning);
  // @ts-ignore
  yield takeEvery(actions.info.type, handleInfo);
  // @ts-ignore
  yield takeEvery(actions.success.type, handleSuccess);
  // yield takeEvery(actions.onLogin.started.type, handleLogin);
}
