import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import createStyles from './StyleLargePlayer';
import { Slider } from '@react-native-assets/slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {
  BackSvg,
  DownloadSvg,
  HeartFillSvg,
  HeartOutlineSvg,
  NextSongSvg,
  PauseSvg,
  PlayFillSvg,
  PrevSongSvg,
  RepeatSvg,
  ShuffleSvg,
  ThreeBarMenuSvg
} from '../../../Svg';

import he from 'he';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setTrackData, setSongState } from '../../../redux/actions';
import Carousel from './MyCarousal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql, useQuery } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { getPermission } from '../../../downloadPermission';
import { StatusBar } from 'react-native';

const decodeHtmlEntities = (html) => he.decode(html);

const LargePlayer = ({
  setModalVisible,
  songStatus,
  togglePlayPauseBtn,
  progress,
  isSpinner,
  randomcolors,
  flatListRef,
  addtofavourite
}) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch = useDispatch();
  const { queue, currentTrack, currentTrackIndex } = useSelector(
    (state) => state.getTrackPlayerData
  );
  const [lyrics, setLyrics] = useState(null);
  const [currentTime, setCurrentTime] = useState(progress.position);
  const { isShuffle, isRepeat } = useSelector((state) => state.getSongState);
  const { songsArrayId } = useSelector((state) => state.getFavouriteSong);
  const modalToastRef = React.useRef();
  const typedef = gql`
    query GET_LYRICS(
      $query: String
      $trackName: String
      $artistName: String
      $albumName: String
    ) {
      getLyricsByQuery(
        query: $query
        trackName: $trackName
        artistName: $artistName
        albumName: $albumName
      ) {
        text
        time
      }
    }
  `;

  const {
    loading: lyricsLoading,
    error: lyricsError,
    data: lyricsData
  } = useQuery(typedef, {
    variables: {
      query: currentTrack?.title,
      trackName: '',
      artistName: currentTrack?.singleartist,
      albumName: ''
    }
  });

  function formatTime(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function timeToSeconds(time) {
    const parts = time.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseFloat(parts[1]);
    return minutes * 60 + seconds;
  }

  const storeData = async (value, key) => {
    try {
      const Value = JSON.stringify(value);
      await AsyncStorage.setItem(key, Value);
    } catch (error) {
      console.log(error);
    }
  };

  const OnMoveSlideSetSong = async (index) => {
    try {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[index],
        currentTrackIndex: index,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');
    } catch (error) {
      console.log('Failed to change track', error);
    }
  };

  const toggleNextSong = async () => {
    if (queue.length <= 1) return;
    const nextIndex = (currentTrackIndex + 1) % queue.length;
    try {
      await TrackPlayer.skip(nextIndex);
      await TrackPlayer.play();
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[nextIndex],
        currentTrackIndex: nextIndex,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');
    } catch (error) {
      console.log('Failed to skip to next track', error);
    }
  };

  const togglePrevSong = async () => {
    if (queue.length <= 1) return;
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    try {
      await TrackPlayer.skip(prevIndex);
      await TrackPlayer.play();
      const Obj = {
        isDisplay: true,
        queue: queue,
        currentTrack: queue[prevIndex],
        currentTrackIndex: prevIndex,
        songStatus: true
      };
      dispatch(setTrackData(Obj));
      storeData(Obj, 'TrackData');
    } catch (error) {
      console.log('Failed to skip to previous track', error);
    }
  };

  const toggleShuffle = () => {
    dispatch(
      setSongState({
        isShuffle: !isShuffle,
        isRepeat: false
      })
    );
  };

  const toggleRepeat = () => {
    dispatch(
      setSongState({
        isShuffle: false,
        isRepeat: !isRepeat
      })
    );
  };

  const toggleDownload = async () => {
    const trackInfo = await TrackPlayer.getActiveTrack();
    // console.log(trackInfo);
    const filenamewithext = trackInfo.title + '.mp3'
    const fileurl = trackInfo.url
    getPermission(filenamewithext,fileurl)
  };

  useEffect(() => {
    if (!lyricsLoading && !lyricsError) {
      setLyrics(lyricsData['getLyricsByQuery']);
    } else {
      setLyrics(null);
    }
  }, [lyricsData]);

  useEffect(() => {
    setCurrentTime(progress.position);
  }, [progress.position]);

  return (
    <GestureHandlerRootView style={styles.paddingconatiner}>
      <LinearGradient
        colors={[randomcolors?.vibrant || colors.background, 'transparent']}
        style={styles.lineargradient}
        locations={[0, 0.5]}
      >
        <StatusBar backgroundColor={randomcolors?.vibrant || 'transparent'} />
        <View style={{
          zIndex:100,
        }}>
        <Toast ref={modalToastRef} />
        </View>
        <View style={[styles.makecenter, styles.head]}>
          <View style={[styles.makecenter, styles.back_box]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.makecenter, styles.back_btn]}
              accessibilityLabel="Go back"
            >
              <BackSvg color={colors.solidcolor} size={30} />
            </TouchableOpacity>
          </View>
          <View style={[styles.makecenter, styles.head_title_box]}></View>
          <View style={[styles.makecenter, styles.threedotbox]}>
            <TouchableOpacity
              style={[styles.makecenter, styles.threedotbtn]}
              accessibilityLabel="Menu"
            >
              <ThreeBarMenuSvg
                color={colors.solidcolor}
                size={25}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View style={[styles.makecenter, styles.carouselcontainer]}>
              <Carousel
                queue={queue}
                currentTrackIndex={currentTrackIndex}
                OnMoveSlideSetSong={OnMoveSlideSetSong}
                flatListRef={flatListRef}
              />
            </View>
            <View style={styles.songdetailbox}>
              <View style={[styles.makecolalign, styles.songdetailleft]}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {decodeHtmlEntities(currentTrack?.title || '')}
                </Text>
                <Text
                  style={styles.desc}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {currentTrack?.artist}
                </Text>
              </View>
              <View style={styles.songdetailright}>
                <TouchableOpacity
                  style={[styles.makecenter, styles.songdetailiconbox]}
                  onPress={() => {
                    addtofavourite(currentTrack);
                  }}
                >
                  {songsArrayId.includes(currentTrack.songId) ? (
                    <HeartFillSvg color={colors.solidcolor} size={25} />
                  ) : (
                    <HeartOutlineSvg color={colors.solidcolor} size={25} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.makecenter, styles.songdetailiconbox]}
                  onPress={toggleDownload}
                >
                  <DownloadSvg color={colors.solidcolor} size={25} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sliderbox}>
              <Slider
                style={styles.progressbar}
                minimumValue={0}
                maximumValue={progress.duration}
                step={1}
                value={progress.position}
                trackHeight={4}
                minimumTrackTintColor={colors.solidcolor}
                maximumTrackTintColor="gray"
                onValueChange={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
                tapToSeek={true}
                thumbTintColor={colors.solidcolor}
                thumbStyle={{ width: 13, height: 13 }}
              />
              <Text style={styles.sliderleftval}>
                {formatTime(progress.position)}
              </Text>
              <Text style={styles.sliderrightval}>
                {formatTime(progress.duration)}
              </Text>
            </View>
            <View style={styles.alloptionsbox}>
              <TouchableOpacity onPress={toggleShuffle}>
                <ShuffleSvg
                  color={isShuffle ? 'pink' : colors.solidcolor}
                  size={25}
                />
              </TouchableOpacity>
              <View style={styles.optionmiddlecontainer}>
                <TouchableOpacity onPress={togglePrevSong}>
                  <PrevSongSvg color={colors.solidcolor} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.makecenter, styles.playbox]}
                  onPress={togglePlayPauseBtn}
                >
                  {isSpinner ? (
                    <ActivityIndicator color={colors.solidcolor} size="small" />
                  ) : songStatus ? (
                    <PauseSvg
                      color={colors.solidcolor}
                      size={30}
                      strokeWidth={8}
                    />
                  ) : (
                    <PlayFillSvg color={colors.solidcolor} size={25} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleNextSong}>
                  <NextSongSvg color={colors.solidcolor} size={30} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={toggleRepeat}>
                <RepeatSvg
                  color={isRepeat ? 'pink' : colors.solidcolor}
                  size={25}
                  showOne={isRepeat}
                />
              </TouchableOpacity>
            </View>
            {lyrics &&
              Array.isArray(lyrics) &&
              !lyricsLoading &&
              !lyricsError && (
                <View style={styles.lyricsbox}>
                  <View
                    style={styles.lyricscontainer(
                      randomcolors?.vibrant || colors.background
                    )}
                  >
                    <View style={styles.lyricsheadbox}>
                      <Text style={styles.lyricsheadtext}>Lyrics Preview</Text>
                    </View>
                    <ScrollView
                      style={styles.lyrictextconatiner}
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled={true}
                    >
                      {lyrics?.map((item, index) => (
                        <View
                          style={[styles.makecolalign, styles.lyricstextbox]}
                          key={index}
                        >
                          <Pressable
                            onPress={async () => {
                              await TrackPlayer.seekTo(
                                timeToSeconds(item.time)
                              );
                              await TrackPlayer.play();
                            }}
                            style={styles.lyricspressable}
                          >
                            <Text
                              style={[
                                styles.lyricstext,
                                {
                                  color:
                                    currentTime >=
                                      timeToSeconds(item.time) - 1 &&
                                    (lyrics[index + 1]
                                      ? currentTime <
                                        timeToSeconds(lyrics[index + 1].time) -
                                          1
                                      : true)
                                      ? '#fff'
                                      : colors.iconinactive
                                }
                              ]}
                            >
                              {item.text}
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                      <View></View>
                    </ScrollView>
                  </View>
                </View>
              )}
          </ScrollView>
        </GestureHandlerRootView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default LargePlayer;
