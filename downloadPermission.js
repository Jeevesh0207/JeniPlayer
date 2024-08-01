import RNFetchBlob from 'rn-fetch-blob';
import { Platform,PermissionsAndroid } from 'react-native';
import { showToast } from './constants';

export const startdownload = (filename, fileurl) => {
    showToast('success','Download started')
    const { dirs } = RNFetchBlob.fs;
    const dirToSave =
        Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${filename}`,
            path: `${dirs.DownloadDir}/${filename}`,
        },
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${filename}`,
        path: `${dirToSave}/${filename}`,
    };
    const configOptions = Platform.select({
        ios: configfb,
        android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
        .fetch('GET', fileurl, {})
        .then(res => {

            if (Platform.OS === 'ios') {
                RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
            }
            if (Platform.OS === 'android') {
                console.log("file downloaded")
                showToast('success','Download finished')
            }
        })
        .catch(e => {
            console.log('Song Download==>', e);
        });
};

export const getPermission = async (filename, fileurl) => {
    if (Platform.OS === 'ios') {
        startdownload(filename, fileurl);
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                startdownload(filename, fileurl);
            } else {
                console.log("please grant permission");
            }
        } catch (err) {
            console.log("display error", err)
        }
    }
};