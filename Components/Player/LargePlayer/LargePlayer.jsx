import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import createStyles from './StyleLargePlayer';
import { Slider } from '@react-native-assets/slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {
  BackSvg,
  DownloadSvg,
  HeartOutlineSvg,
  NextSongSvg,
  PauseSvg,
  PlayFillSvg,
  PrevSongSvg,
  RepeatSvg,
  ShuffleSvg,
  ThreeBarMenuSvg
} from '../../../Svg';

const width = Dimensions.get('window').width;
import he from 'he';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLyrics } from '../../../redux/actions';
import Carousel from './MyCarousal';
import translate from 'translate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QueueList from '../Queue/QueueList';

const decodeHtmlEntities = (html) => he.decode(html);

const LargePlayer = ({
  setModalVisible,
  songStatus,
  togglePlayPauseBtn,
  progress,
  isSpinner,
  randomcolors,
  flatListRef
}) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch = useDispatch();
  const [modalQueueVisible, setModalQueueVisible] = useState(false);
  const { queue, currentTrack, currentTrackIndex } = useSelector(
    (state) => state.getTrackPlayerData
  );
  const [lyrics, setLyrics] = useState(null);
  const { loading, data, error } = useSelector((state) => state.getLyricsData);
  const [currentTime, setCurrentTime] = useState(progress.position);

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

  const OnMoveSlideSetSong = async (index) => {
    try {
      if (index === 0) {
        await TrackPlayer.skipToPrevious()
      } else {
        await TrackPlayer.skip(index);
      }
      await TrackPlayer.play();
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
    } catch (error) {
      console.log('Failed to skip to previous track', error);
    }
  };

  useEffect(() => {
    if (data !== null) {
      setLyrics(data);
    }
  }, [data]);

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
              onPress={() => setModalQueueVisible(true)}
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
                <View style={[styles.makecenter, styles.songdetailiconbox]}>
                  <HeartOutlineSvg color={colors.solidcolor} size={25} />
                </View>
                <View style={[styles.makecenter, styles.songdetailiconbox]}>
                  <DownloadSvg color={colors.solidcolor} size={25} />
                </View>
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
              <TouchableOpacity>
                <ShuffleSvg color={colors.solidcolor} size={25} />
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
              <TouchableOpacity>
                <RepeatSvg color={colors.solidcolor} size={25} />
              </TouchableOpacity>
            </View>
            {lyrics && Array.isArray(lyrics) && !loading && error === null && (
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
                  >
                    {lyrics?.map((item, index) => (
                      <View
                        style={[styles.makecolalign, styles.lyricstextbox]}
                        key={index}
                      >
                        <Text
                          style={[
                            styles.lyricstext,
                            {
                              color: currentTime >= timeToSeconds(item.time) - 1 &&
                                (lyrics[index + 1] ? currentTime < timeToSeconds(lyrics[index + 1].time) - 1 : true)
                                ? '#fff'
                                : colors.iconinactive
                            }
                          ]}
                        >
                          {item.text}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                  <View style={[styles.makecolalign, styles.showmorebox]}>
                    <TouchableOpacity
                      style={[styles.makecenter, styles.showmorebtn]}
                    >
                      <Text style={styles.showmoretext}>Show More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </GestureHandlerRootView>
      </LinearGradient>
      <Modal
        visible={modalQueueVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalQueueVisible(false)}
      >
        <QueueList setModalQueueVisible={setModalQueueVisible} />
      </Modal>
    </GestureHandlerRootView>
  );
};

export default LargePlayer;
