import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';
import { setTrackData, fetchLyrics } from '../../redux/actions';

import {
    setQueue,
    skip
} from 'react-native-track-player/lib/src/trackPlayer';

const storeData = async (value, key) => {
    try {
        const Value = JSON.stringify(value);
        await AsyncStorage.setItem(key, Value);
    } catch (error) {
        console.log(error);
    }
};

const addInQueue = async (trackData, currentTrack, dispatch) => {

    try {
        const formattedData = trackData.map((item, index) => ({
            id: index,
            url: item.downloadUrl[2].url,
            artwork: item.image,
            title: item.title,
            artist: item.desc,
            album: item.album,
            image: item.image,
            singleartist: item.artist,
            duration: item.duration,
            songId: item.id
        }));

        const currentTrackIndex = formattedData.findIndex(item => item.songId === currentTrack.id);

        const Obj = {
            isDisplay: true,
            queue: formattedData,
            currentTrack: formattedData[currentTrackIndex],
            currentTrackIndex: currentTrackIndex,
            songStatus: true
        };
        dispatch(setTrackData(Obj));
        storeData(Obj, 'TrackData');

        await setQueue(formattedData);
        await skip(currentTrackIndex);
        await TrackPlayer.play();
    } catch (error) {
        console.error('Error adding to queue:', error);
    }
};

export { addInQueue};
