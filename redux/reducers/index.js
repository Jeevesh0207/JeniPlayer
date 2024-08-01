import {combineReducers } from '@reduxjs/toolkit';

import LaunchData from './LaunchData';
import VerticalListData from './VerticalListData';
import TrackListID from './TrackListID';
import Theme from './Theme';

import TrackPlayerData from './TrackPlayerData';
import LyricsData from './LyricsData';

import ActiveNav from './ActiveNav';

import UserData from './UserData';
import SongState from './SongState';

import FetchTrack from './FetchTrack';

import FavouriteSong from './FavouriteSong';

const rootReducer = combineReducers({
    getLaunchData:LaunchData,
    getVerticalListData:VerticalListData,
    getTrackListID:TrackListID,
    getTheme:Theme,
    getTrackPlayerData:TrackPlayerData,
    getLyricsData:LyricsData,
    getActiveNav:ActiveNav,
    getUserData:UserData,
    getSongState:SongState,
    getFetchTrack:FetchTrack,
    getFavouriteSong:FavouriteSong
});

export default rootReducer;
