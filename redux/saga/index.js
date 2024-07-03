import { all } from 'redux-saga/effects'
import fetchImage from './fetchData'
import fetchLyrics from './fetchLyrics'

export default function* rootSaga() {
    yield all([
        fetchImage(),
        fetchLyrics()
    ])
}