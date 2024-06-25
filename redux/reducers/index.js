import {combineReducers } from '@reduxjs/toolkit';
import getImageData from './fetch' 
import UploadData from "./uploadData"

import LaunchData from './LaunchData';
import VerticalListData from './VerticalListData';
import TrackListID from './TrackListID';
import Theme from './Theme';

const rootReducer = combineReducers({
    getImage:getImageData,
    getUploadData:UploadData,

    getLaunchData:LaunchData,
    getVerticalListData:VerticalListData,
    getTrackListID:TrackListID,
    getTheme:Theme
});

export default rootReducer;
