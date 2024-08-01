import axios from 'axios';
import { API_URL } from '@env';
import { showToast } from './Validation';
import { setFavouriteSong } from '../../redux/actions';

const toggleAddtofavourite = async (songDetails, dispatch, email, type = "") => {
    let Obj ={}
    if (type === "") {
        const songObj={
            id:songDetails?.songId,
            title:songDetails?.title,
            type:"song",
            desc:songDetails?.desc,
            image:songDetails?.image,
            album:songDetails?.album,
            artist:songDetails?.artist,
            duration:songDetails?.duration,
            downloadUrl:songDetails?.downloadUrl
        }
        Obj = {
            songData: songObj,
            email,
        }
        
    }else{
        Obj = {
            songData: songDetails,
            email,
        }
    }
    try {
        const response = await axios.post(API_URL + "/addtofavourite", Obj)
        const result = response.data
        if (result.ok) {
            showToast('success', result.msg, '')
            dispatch(setFavouriteSong({
                songs: result?.favourite,
                songsId:result?.songArrayId
            }))
        } else {
            console.log('Failed to add song to favourite')
            showToast('error', 'Failed to add song to favourite', '')
        }
    } catch (error) {
        console.log(error.message)
        showToast('error', 'Failed to add song to favourite', '')
    }
}

export { toggleAddtofavourite }