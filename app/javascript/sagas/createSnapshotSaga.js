import {takeEvery, put} from 'redux-saga/effects'
import {clearSnapshot} from 'actions/snapshotActions'
import {CREATE_SNAPSHOT} from 'actions/actionTypes'

export function* createSnapshot() {
  yield put(clearSnapshot())
}
export function* createSnapshotSaga() {
  yield takeEvery(CREATE_SNAPSHOT, createSnapshot)
}
