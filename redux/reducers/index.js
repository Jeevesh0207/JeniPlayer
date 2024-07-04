import {combineReducers } from '@reduxjs/toolkit';

import LaunchData from './LaunchData';
import VerticalListData from './VerticalListData';
import TrackListID from './TrackListID';
import Theme from './Theme';

import TrackPlayerData from './TrackPlayerData';
import LyricsData from './LyricsData';

import ActiveNav from './ActiveNav';

const rootReducer = combineReducers({
    getLaunchData:LaunchData,
    getVerticalListData:VerticalListData,
    getTrackListID:TrackListID,
    getTheme:Theme,
    getTrackPlayerData:TrackPlayerData,
    getLyricsData:LyricsData,
    getActiveNav:ActiveNav
});

export default rootReducer;
