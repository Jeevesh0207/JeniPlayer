import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createThreeStyles } from './StyleThreeBar';
import { Image, Skeleton } from '@rneui/themed';
import he from 'he';
import {
  AddInQueueSvg,
  AddToPlaylistSvg,
  DownloadSvg,
  HeartFillSvg,
  HeartOutlineSvg,
  PlayAsNextSvg,
  PlayOutlineSvg
} from '../../Svg';

const decodeHtmlEntities = (html) => he.decode(html);

const replace150with500 = (url) => url?.replace('150x150', '500x500') || url;
import { useDispatch, useSelector } from 'react-redux';

import { addInQueue, CheckUserAuth } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { toggleAddtofavourite } from '../../constants';
import { getPermission } from '../../downloadPermission';
import TrackPlayer from 'react-native-track-player';

const ThreeBar = ({ setModalVisible, ThreeBarData, trackData }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch();
  const styles = useMemo(() => createThreeStyles(colors), [colors]);
  const { isUserLogin, email } = useSelector((state) => state.getUserData);
  const { songsArrayId } = useSelector((state) => state.getFavouriteSong);

  const addtofavourite = (currentTrack) => {

    const newtrack = {
      ...currentTrack,
      songId: currentTrack.id
    };
    toggleAddtofavourite(newtrack, dispatch, email);
    if(songsArrayId.includes(currentTrack.id)){
      setModalVisible(false)
    }
  };

  const toggleDownload = async () => {
    const trackInfo = await TrackPlayer.getActiveTrack();
    // console.log(trackInfo);
    const filenamewithext = trackInfo.title + '.mp3';
    const fileurl = trackInfo.url;
    getPermission(filenamewithext, fileurl);
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={styles.posterbox}>
          <View style={styles.poster}>
            {ThreeBarData?.image && (
              <Image
                style={styles.poster_image}
                PlaceholderContent={
                  <Skeleton
                    width={'100%'}
                    height={'100%'}
                    LinearGradientComponent={LinearGradient}
                    animation="wave"
                  />
                }
                source={{
                  uri: replace150with500(ThreeBarData?.image) || ''
                }}
                contentPosition={'top center'}
                alt="poster"
                transition={true}
                onError={(error) => console.log('Image failed to load', error)}
              />
            )}
          </View>
          <View style={[styles.makecenter, styles.title]}>
            <Text style={styles.titletext}>
              {decodeHtmlEntities(ThreeBarData?.title)}
            </Text>
          </View>
          <View style={[styles.makecenter, styles.desc]}>
            <Text style={styles.desctext}>
              {decodeHtmlEntities(ThreeBarData?.desc)}
            </Text>
          </View>
        </View>
        <View style={styles.optionscontainer}>
          <TouchableOpacity
            onPress={async () => {
              if (isUserLogin) {
                addInQueue(trackData, ThreeBarData, dispatch);
              } else {
                setModalVisible(false);
                navigation.navigate('authpage');
              }
            }}
            style={[styles.makealigncenter, styles.rowbox]}
          >
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <PlayOutlineSvg size={18} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Play Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.makealigncenter, styles.rowbox]}
            onPress={() => {
              addtofavourite(ThreeBarData);
            }}
          >
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              {songsArrayId.includes(ThreeBarData?.id) ? (
                <HeartFillSvg color={colors.solidcolor} size={20} />
              ) : (
                <HeartOutlineSvg color={colors.solidcolor} size={20} />
              )}
            </View>
            <Text style={styles.rowtext}>Save to Library</Text>
          </TouchableOpacity>
          {/* <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <AddToPlaylistSvg size={20} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Add to Playlist</Text>
          </View> */}
          {/* <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <AddInQueueSvg size={21} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Add to Queue</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <PlayAsNextSvg size={21} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Play Next</Text>
          </View> */}
          <TouchableOpacity
            style={[styles.makealigncenter, styles.rowbox]}
            onPress={() => {
              toggleDownload();
            }}
          >
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <DownloadSvg size={22} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Download</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.closebox}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={[styles.makecenter, styles.closecontainer]}
          >
            <Text style={styles.closetext}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ThreeBar;
