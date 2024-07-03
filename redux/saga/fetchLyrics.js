import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getApi(url) {
    return await fetch(url)
        .then(async (response) => await response.json())
        .catch((error) => { throw error });
}

const storeData = async (value, key) => {
    try {
        const Value = JSON.stringify(value);
        await AsyncStorage.setItem(key, Value);
    } catch (error) {
        console.log(error);
    }
};

const parseLyrics = (lyrics) => {
    if (lyrics === "") return null;

    const correctTimeFormat = (time) => {
        const timeParts = time.split(':');
        if (timeParts.length !== 2) return null;

        let [minutes, seconds] = timeParts;
        if (minutes.length !== 2) minutes = minutes.padStart(2, '0');

        let [wholeSeconds, milliseconds] = seconds.split('.');
        if (wholeSeconds.length !== 2) wholeSeconds = wholeSeconds.padStart(2, '0');
        if (milliseconds.length !== 2) milliseconds = milliseconds.padEnd(2, '0');

        return `${minutes}:${wholeSeconds}.${milliseconds}`;
    };

    return lyrics
        .split('\n')
        .map((line) => {
            const cleanLine = line.replace('\r', '');
            const match = cleanLine.match(/\[(\d{2}:\d{2}(?:\.\d{2})?)\](.*)/);
            if (match && match[2].trim() !== '') {
                const correctedTime = correctTimeFormat(match[1]);
                if (correctedTime) {
                    return { time: correctedTime, text: match[2].trim() };
                }
            }
            return null;
        })
        .filter((item) => item !== null);
};

export const findTracksWithSyncedLyrics = (tracks, artistName) => {
    for (let track of tracks) {
        if (track.syncedLyrics !== null &&
            track.syncedLyrics !== "" &&
            similarity(track.artistName, artistName) >= 0.3) {
            return track;
        }
    }
    return null;
};

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    const percentage = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    return percentage;
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0) {
                costs[j] = j;
            } else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) {
            costs[s2.length] = lastValue;
        }
    }
    return costs[s2.length];
}

function* fetchLyrics(action) {
    try {
        const url = action.data.url;
        const artistName = action.data.artistName;
        const response = yield call(getApi, url);
        const track = findTracksWithSyncedLyrics(response, artistName);
        if (track) {
            const formattedLyrics = parseLyrics(track.syncedLyrics || "");
            yield call(storeData, formattedLyrics, 'currentLyrics');
            yield put({ type: 'FETCH_LYRICS_SUCCESS', data: formattedLyrics });
        } else {
            yield put({ type: 'FETCH_LYRICS_FAILED', message: 'No matching track found' });
        }
    } catch (e) {
        yield put({ type: 'FETCH_LYRICS_FAILED', message: e.message });
    }
}

function* userSaga() {
    yield takeLatest('FETCH_LYRICS', fetchLyrics);
}

export default userSaga;
