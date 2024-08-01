import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import createStyles from './StyleMiniPlayer';
import {
  FullVolumeSvg,
  HeartOutlineSvg,
  MuteVolumeSvg,
  PlayFillSvg,
  PauseSvg,
  HeartFillSvg
} from '../../../Svg';
import { Slider } from '@react-native-assets/slider';
import LargePlayer from '../LargePlayer/LargePlayer';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  useProgress,
  State
} from 'react-native-track-player';
import he from 'he';
import { getColors } from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';
import { setVolume } from 'react-native-track-player/lib/src/trackPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setTrackData } from '../../../redux/actions';
import { Image, Skeleton } from '@rneui/themed';
import { toggleAddtofavourite } from '../../../constants';
const decodeHtmlEntities = (html) => he.decode(html);

const MiniPlayer = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const flatListRef = useRef(null);

  const styles = useMemo(() => createStyles(colors), [colors]);

  const [muteVolume, setMuteVolume] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSpinner, setSpinner] = useState(false);
  const progress = useProgress();
  const [currentTime, setCurrentTime] = useState(progress.position);

  const { isShuffle, isRepeat } = useSelector((state) => state.getSongState);
  const { email } = useSelector((state) => state.getUserData);
  const { songsArrayId } = useSelector((state) => state.getFavouriteSong);


  const { queue, currentTrack, currentTrackIndex, songStatus } = useSelector(
    (state) => state.getTrackPlayerData
  );

  const [randomcolors, setRandomColors] = useState(null);

  const CheckPlayBackState = useCallback(async () => {
    const event = await TrackPlayer.getPlaybackState();
    switch (event.state) {
      case 'buffering' || 'loading':
        setSpinner(true);
        break;
      case 'playing':
        dispatch(setTrackData({ songStatus: true }));
        setSpinner(false);
        break;
      default:
        dispatch(setTrackData({ songStatus: false }));
        setSpinner(false);
        break;
    }
  }, [dispatch]);

  useEffect(() => {
    CheckPlayBackState();
  }, [CheckPlayBackState]);

  const getImageColor = useCallback(async () => {
    const currentUrl = currentTrack?.image || null;
    if (!currentUrl) return;

    try {
      const color = await getColors(currentUrl, {
        fallback: colors.background_C1,
        cache: true,
        key: currentUrl
      });
      setRandomColors(color);
    } catch (error) {
      console.error('Failed to get colors:', error);
    }
  }, [currentTrack, colors]);

  useEffect(() => {
    getImageColor();
  }, [getImageColor, currentTrackIndex]);

  const storeData = async (value, key) => {
    try {
      const Value = JSON.stringify(value);
      await AsyncStorage.setItem(key, Value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepeatShuffle = async () => {
    if (isShuffle) {
      console.log('SHUFFLE');
      const randomIndex = Math.floor(Math.random() * queue.length);
      await TrackPlayer.skip(randomIndex);
      await TrackPlayer.play();
      setCurrentTime(0);
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[randomIndex],
        currentTrackIndex: randomIndex,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');
    } else if (isRepeat) {
      console.log('REPEAT');
      const lastindex = currentTrackIndex;
      console.log(currentTrackIndex);
      await TrackPlayer.skip(currentTrackIndex);
      await TrackPlayer.play();
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[lastindex],
        currentTrackIndex: lastindex,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');
    }
  };


  useEffect(() => {
    if (progress.position + 2 >= progress.duration && progress.position!=0 && progress.duration!=0) {
      console.log('REACH AT END OF TRACK');
      handleRepeatShuffle()
    }
  }, [progress]);

  const handleTrackChange = useCallback(
    async (event) => {
      const index = event.index;
      console.log('NONE');
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[index],
        currentTrackIndex: index,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');

      if (index !== null && index !== undefined && flatListRef.current) {
        const dataLength = flatListRef.current.props.data.length;
        if (index >= 0 && index < dataLength) {
          flatListRef.current.scrollToIndex({
            index: index,
            animated: false
          });
        } else {
          console.log(
            `scrollToIndex out of range: requested index ${index} but minimum is 0 and maximum is ${
              dataLength - 1
            }`
          );
        }
      } else {
        console.log(`flatListRef.current not ready...`);
      }
    },
    [queue, dispatch]
  );

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], handleTrackChange);

  const handlePlaybackState = useCallback(
    (event) => {
      switch (event.state) {
        case 'buffering' || 'loading':
          setSpinner(true);
          break;
        case 'playing':
          dispatch(setTrackData({ songStatus: true }));
          setSpinner(false);
          break;
        default:
          dispatch(setTrackData({ songStatus: false }));
          setSpinner(false);
          break;
      }
    },
    [dispatch]
  );

  useTrackPlayerEvents([Event.PlaybackState], handlePlaybackState);

  useEffect(() => {
    setCurrentTime(progress.position);
  }, [progress.position]);

  const togglePlayPauseBtn = useCallback(async () => {
    if (songStatus) {
      TrackPlayer.pause();
      dispatch(setTrackData({ songStatus: false }));
    } else {
      TrackPlayer.play();
      dispatch(setTrackData({ songStatus: true }));
    }
  }, [songStatus, dispatch]);

  const toggleVolume = useCallback(() => {
    if (muteVolume) {
      setVolume(1);
      setMuteVolume(false);
    } else {
      setVolume(0);
      setMuteVolume(true);
    }
  }, [muteVolume]);

  const addtofavourite = (currentTrack)=>{
    // console.log(currentTrack)
    const newtrack={
      ...currentTrack,
      songId:currentTrack.songId
    }
    toggleAddtofavourite(newtrack,dispatch,email)
  }

  return (
    <Pressable
      onPress={() => setModalVisible(true)}
      style={[styles.makecenter, styles.container]}
    >
      <View style={[styles.outerplayerbox]}>
        <LinearGradient
          colors={[randomcolors?.vibrant || colors.background, 'transparent']}
          style={styles.lineargradient}
          locations={[0, 0.9]}
        >
          <View style={[styles.makealigncenter, styles.playerbox]}>
            <View style={styles.poster_box}>
              {currentTrack?.image && (
                <Image
                  style={styles.song_image}
                  source={{ uri: currentTrack?.image }}
                  contentPosition={'top center'}
                  PlaceholderContent={
                    <Skeleton
                      width={'100%'}
                      height={'100%'}
                      LinearGradientComponent={LinearGradient}
                      animation="wave"
                    />
                  }
                  alt="jpg"
                  transition={true}
                />
              )}
            </View>
            <View style={styles.detailbox}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {decodeHtmlEntities(currentTrack?.title || '')}
              </Text>
              <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
                {currentTrack?.artist}
              </Text>
            </View>
            <View style={[styles.makecenter, styles.volumebox]}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  toggleVolume();
                }}
              >
                {muteVolume ? (
                  <MuteVolumeSvg color={colors.solidcolor} size={25} />
                ) : (
                  <FullVolumeSvg color={colors.solidcolor} size={25} />
                )}
              </TouchableOpacity>
            </View>
            <View style={[styles.makecenter, styles.fav_box]}>
              <TouchableOpacity onPress={(e) => {
                e.stopPropagation()
                addtofavourite(currentTrack)
              }} >
                {
                  songsArrayId.includes(currentTrack.songId)?
                  <HeartFillSvg color={colors.solidcolor} size={25}/>:
                  <HeartOutlineSvg color={colors.solidcolor} size={25} />
                }
              </TouchableOpacity>
            </View>
            <View style={[styles.makecenter, styles.playpausebox]}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  togglePlayPauseBtn();
                }}
              >
                {isSpinner ? (
                  <ActivityIndicator color={colors.solidcolor} size="large" />
                ) : songStatus ? (
                  <PauseSvg
                    color={colors.solidcolor}
                    size={26}
                    strokeWidth={8}
                  />
                ) : (
                  <PlayFillSvg color={colors.solidcolor} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.progressbox}>
            <Slider
              style={styles.progressbar}
              minimumValue={0}
              maximumValue={progress.duration}
              step={1}
              value={currentTime}
              trackHeight={3}
              minimumTrackTintColor={colors.solidcolor}
              maximumTrackTintColor="gray"
              onValueChange={async (value) => {
                await TrackPlayer.seekTo(value);
              }}
              tapToSeek={true}
              thumbTintColor={progress.duration === 0 ? 'transparent' : 'gray'}
              thumbStyle={{ width: 3, height: 4, borderRadius: 0 }}
            />
          </View>
        </LinearGradient>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LargePlayer
          setModalVisible={setModalVisible}
          songStatus={songStatus}
          togglePlayPauseBtn={togglePlayPauseBtn}
          progress={progress}
          isSpinner={isSpinner}
          randomcolors={randomcolors}
          flatListRef={flatListRef}
          addtofavourite={addtofavourite}
        />
      </Modal>
    </Pressable>
  );
};

export default MiniPlayer;
