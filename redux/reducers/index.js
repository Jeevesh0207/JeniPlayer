import {combineReducers } from '@reduxjs/toolkit';

import LaunchData from './LaunchData';
import VerticalListData from './VerticalListData';
import TrackListID from './TrackListID';
import Theme from './Theme';

import TrackPlayerData from './TrackPlayerData';
import LyricsData from './LyricsData';

const rootReducer = combineReducers({
    getLaunchData:LaunchData,
    getVerticalListData:VerticalListData,
    getTrackListID:TrackListID,
    getTheme:Theme,
    getTrackPlayerData:TrackPlayerData,
    getLyricsData:LyricsData
});

export default rootReducer;
