import '@babel/polyfill'
import {takeEvery, put} from 'redux-saga/effects'
import {
  createSnapshotSaga,
  createSnapshot,
} from 'sagas/createSnapshotSaga'
import {CREATE_SNAPSHOT} from 'actions/actionTypes'
import {
  clearSnapshot,
} from 'actions/snapshotActions'

describe('createSnapshotSaga', () => {
  it('creates snapshot on CREATE_SNAPSHOT', () => {
    const gen = createSnapshotSaga()
    expect(gen.next().value).toEqual(takeEvery(CREATE_SNAPSHOT, createSnapshot))
  })
})

describe('createSnapshot', () => {
  it('creates and puts snapshot', () => {
    const gen = createSnapshot()
    expect(gen.next().value).toEqual(
      put(clearSnapshot())
    )
  })
})
