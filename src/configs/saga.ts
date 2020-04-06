import {all, fork} from 'redux-saga/effects';
import {saga as teamsManagementSaga} from '../scenes/content/teammanagement/saga'
import {saga as employeesListSaga} from '../scenes/content/teammanagement/employeeslist/saga'
import {saga as globalSaga} from '../scenes/duck';

export default function* rootSaga() {
  yield all([
    fork(teamsManagementSaga),
    fork(employeesListSaga),
    fork(globalSaga)
  ]);
}
