import { all } from 'redux-saga/effects'
import fetchImage from './fetchData'

export default function* rootSaga() {
    yield all([
        fetchImage(),
    ])
}