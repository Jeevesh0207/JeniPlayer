import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';
import { setTrackData } from '../../redux/actions';

import {
    add,
    load,
    setQueue,
    skip
} from 'react-native-track-player/lib/src/trackPlayer';

const storeData = async (value, key) => {
    try {
        const Value = JSON.stringify(value);
        await AsyncStorage.setItem(key, Value);
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

const addInQueue = async (trackData, currentTrack, dispatch) => {
    try {
        if (!Array.isArray(trackData) || trackData.length === 0) {
            throw new Error('Invalid track data');
        }


        const formattedData = trackData.map((item, index) => {
            if (!item.downloadUrl || item.downloadUrl.length < 3 || !item.downloadUrl[2].url) {
                throw new Error(`Invalid download URL for track at index ${index}`);
            }

            return {
                id: index,
                url: item.downloadUrl[2].url,
                artwork: item.image,
                title: item.title,
                artist: item.desc,
                album: item.album,
                image: item.image,
                singleartist: item.artist,
                desc:item.desc,
                duration: item.duration,
                songId: item.id,
                downloadUrl:item.downloadUrl
            };
        });

        const currentTrackIndex = formattedData.findIndex(item => item.songId === currentTrack?.id);

        if (currentTrackIndex === -1) {
            throw new Error('Current track not found in the formatted data');
        }

        const Obj = {
            isDisplay: true,
            queue: formattedData,
            currentTrack: formattedData[currentTrackIndex],
            currentTrackIndex: currentTrackIndex,
            songStatus: true
        };

        dispatch(setTrackData(Obj));
        await storeData(Obj, 'TrackData');

        await setQueue(formattedData);
        await skip(currentTrackIndex);
        await TrackPlayer.play();
    } catch (error) {
        console.error('Error adding to queue:', error);
    }
};

export { addInQueue };
