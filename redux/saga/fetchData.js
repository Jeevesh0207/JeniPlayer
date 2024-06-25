import { call, put, takeEvery } from 'redux-saga/effects'

const apiUrl = "";

async function getApi(formData) {
    return fetch(apiUrl, {
        method: 'POST',
        body: formData,
    }).then(async (response) => await response.blob()
    )
    .catch((error) => { throw error })
}

function* fetchImage(action) {
    try {

        console.log("Image Working")
        // const FormData = action.formData
        // const response = yield call(getApi, FormData);
        // const enhancedImageUri = URL.createObjectURL(response);
        // yield put({ type: 'GET_FETCH_SUCCESS', data: enhancedImageUri });
    } catch (e) {
        yield put({ type: 'GET_FETCH_FAILED', message: e.message });
    }
}

function* userSaga() {
    yield takeEvery('GET_FETCH_REQUESTED', fetchImage);
}

export default userSaga;