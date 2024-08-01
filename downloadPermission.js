import RNFS from 'react-native-fs';
import { Platform} from 'react-native';
import { showToast } from './constants';

export const startDownload = async (filename, fileurl) => {
    showToast('success', 'Download started');
    const dirToSave = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;

    try {
        const downloadDest = `${dirToSave}/${filename}`;
        const downloadResult = await RNFS.downloadFile({
            fromUrl: fileurl,
            toFile: downloadDest,
            background: true,
            progressDivider: 1,
            progress: (res) => {
                // Optionally, update download progress
            }
        }).promise;

        if (downloadResult.statusCode === 200) {
            if (Platform.OS === 'ios') {
                RNFS.openFile(downloadDest);
            }
            showToast('success', 'Download finished');
        } else {
            throw new Error(`Failed to download file: ${downloadResult.statusCode}`);
        }
    } catch (e) {
        console.log('File Download Error==>', e);
    }
};

export const getPermission = async (filename, fileurl) => {
    startDownload(filename, fileurl);
};
