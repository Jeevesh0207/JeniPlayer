import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from "react-native-track-player";
import { setTrackData,fetchLyrics } from "../../redux/actions";
import { addTracks } from '../../trackPlayerServices';
import { isEqual } from 'lodash';
import {
    getQueue,
    load,
    setQueue,
} from 'react-native-track-player/lib/src/trackPlayer';

const storeData = async (value, key) => {
    try {
        const Value = JSON.stringify(value);
        await AsyncStorage.setItem(key, Value);
    } catch (error) {
        console.log(error);
    }
};


const addOneSong = async (list,dispatch) => {
    const currentTrack = await TrackPlayer.getActiveTrack()
    const Track = {
        id: 0,
        url: list.downloadUrl[2].url,
        artwork: list.image,
        title: list.title,
        artist: list.desc,
        album:list.album,
        image: list.image,
        singleartist:list.artist,
        duration: list.duration,
        songId:list.id
    };

    if (isEqual(Track, currentTrack)) return;
    const Obj = {
        queue: [Track],
        currentTrack: Track,
    };
    dispatch(setTrackData(true, 'display'));
    dispatch(setTrackData(Obj, 'addTrack'));
    dispatch(setTrackData(0, 'addTrackIndex'));

    storeData(Obj, 'TrackData')

    await TrackPlayer.reset();
    await addTracks([Track]);
    await TrackPlayer.play();
};



const addInQueue = async (list,dispatch )=> {
    try {
        dispatch(setTrackData(true, 'display'));
        const currentQueue = await getQueue();
        const formattedData = list.map((item, index) => ({
            id: index,
            url: item.downloadUrl[2].url,
            artwork: item.image,
            title: item.title,
            artist: item.desc,
            album:item.album,
            image: item.image,
            singleartist:item.artist,
            duration: item.duration,
            songId:item.id
        }));

        if (isEqual(formattedData, currentQueue)) return;

        console.log('Queues are different, updating the queue.');

        const Obj = {
            queue: formattedData,
            currentTrack: formattedData[0],
        };

        dispatch(setTrackData(Obj, 'addTrack'));
        dispatch(setTrackData(0, 'addTrackIndex'));
        storeData(Obj, 'TrackData')

        await setQueue(formattedData);
        await load(formattedData[0]);
        await TrackPlayer.play();
    } catch (error) {
        console.error('Error adding to queue:', error);
    }
};


export { addInQueue, addOneSong }