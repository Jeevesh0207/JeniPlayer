import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
  Pressable
} from 'react-native';
import { createStyles } from './StyleAllTracks';
import { useTheme } from '../../Theme/ThemeContext';
import he from 'he';
import {
  AnimatedPlaySong,
  BackSvg,
  HeartFillSvg,
  HeartOutlineSvg,
  OneBarMenuSvg,
  PlayFillSvg,
  SearchSvg,
  ThreeDotSvg
} from '../../Svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

import { getColors } from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';

import { addInQueue, CheckUserAuth } from '../../constants';
import ThreeBar from './ThreeBar';
import { Image, Skeleton } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setFetchTrack } from '../../redux/actions';
import { toggleAddtofavourite } from '../../constants';

//! ------------OUTER FUNCIONS ---------------

const decodeHtmlEntities = (html) => he.decode(html);

const Box = memo(
  ({
    item,
    styles,
    colors,
    currentTrackId,
    setModalVisible,
    setThreeBarData,
    addSongInQueue,
    isUserLogin,
    addtofavourite,
    songsArrayId
  }) => (
    <TouchableOpacity
      onPress={() => addSongInQueue(item)}
      style={[styles.makealigncenter, styles.song_box]}
    >
      <View style={[styles.makealigncenter, styles.song_left]}>
        <View style={styles.song_image_box}>
          {isUserLogin && currentTrackId === item.id && (
            <View style={[styles.makecenter, styles.song_animated_box]}>
              <AnimatedPlaySong color={colors.solidcolor} size={30} />
            </View>
          )}
          {item?.image && (
            <Image
              style={styles.song_image}
              PlaceholderContent={
                <Skeleton
                  width={'100%'}
                  height={'100%'}
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                />
              }
              source={{
                uri: item?.image || ''
              }}
              contentPosition={'top center'}
              alt="poster"
              transition={true}
              onError={(error) => console.log('Image failed to load', error)}
            />
          )}
        </View>
        <View style={styles.song_details_box}>
          <Text
            style={styles.song_details_title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {decodeHtmlEntities(item.title)}
          </Text>
          <Text
            style={styles.song_details_desc}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.desc}
          </Text>
        </View>
      </View>
      <View style={[styles.makealigncenter, styles.song_right]}>
        <TouchableOpacity
          style={[styles.makecenter, styles.song_download_box]}
          onPress={() => {
            addtofavourite(item);
          }}
        >
          {songsArrayId.includes(item.id) ? (
            <HeartFillSvg color={colors.solidcolor} size={25} />
          ) : (
            <HeartOutlineSvg color={colors.solidcolor} size={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            setThreeBarData(item);
            setModalVisible(true);
          }}
          style={[styles.makecenter, styles.song_three_dot]}
        >
          <OneBarMenuSvg color={colors.desc} size={32} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
);

const replace150with500 = (url) => url?.replace('150x150', '500x500') || url;

const SongType = {
  album: 'getAlbumByToken',
  artist: 'getRadioByToken',
  playlist: 'getPlaylistByToken',
  song: 'getSongByToken'
};

//! ------------COMPONENT START ---------------

const AllTracks = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { token, type } = useSelector((state) => state.getTrackListID);
  const { isDisplay } = useSelector((state) => state.getTrackPlayerData);
  const [randomcolors, setrandomColors] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ThreeBarData, setThreeBarData] = useState(null);
  const { isUserLogin, email } = useSelector((state) => state.getUserData);
  const { songs } = useSelector((state) => state.getFetchTrack);
  const { songStatus, currentTrack, currentTrackIndex } = useSelector(
    (state) => state.getTrackPlayerData
  );
  const { songsArrayId } = useSelector((state) => state.getFavouriteSong);

  const typedef = gql`
    query GET_UNIVERSAL_DATA($token: String, $type: String) {
      ${SongType[type]}(token: $token, type: $type) {
        id
        title
        type
        desc
        image
        songs {
          id
          title
          type
          desc
          image
          album
          artist
          duration
          downloadUrl {
            url
            quality
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(typedef, {
    variables: { token: token, type: type }
  });

  const [trackData, setTrackdata] = useState([]);
  const [mainHeight, setMainHeight] = useState(null);
  const [isHeadNavRelative, setIsHeadNavRelative] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (currentTrack !== null) {
      setCurrentTrackId(currentTrack?.songId);
    }
  }, [currentTrack]);

  const storeData = async (value, key) => {
    try {
      const Value = JSON.stringify(value);
      await AsyncStorage.setItem(key, Value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  useEffect(() => {
    if (data) {
      setTrackdata(data[SongType[type]]);
      storeData(data[SongType[type]], 'fetchtrack');
      dispatch(setFetchTrack(data[SongType[type]]));
    }
  }, [data]);

  useEffect(() => {
    const currentUrl = trackData?.image || null;
    if (currentUrl !== null) {
      getColors(currentUrl, {
        fallback: colors.background_C1,
        cache: true,
        key: currentUrl
      }).then(setrandomColors);
    }
  }, [trackData]);

  const handleScroll = useCallback(
    (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      if (offsetY >= mainHeight - 50) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          })
        ]).start();
        setIsHeadNavRelative(true);
      } else {
        setIsHeadNavRelative(false);
        fadeAnim.setValue(0);
        slideAnim.setValue(-50);
      }
    },
    [mainHeight, fadeAnim, slideAnim]
  );

  const renderHeader = useCallback(
    () => (
      <>
        <View style={[styles.makecenter, styles.top_banner]}>
          <View style={[styles.makecenter, styles.poster_container]}>
            <View style={styles.poster_box}>
              {trackData?.image && (
                <Image
                  style={styles.song_image}
                  PlaceholderContent={
                    <Skeleton
                      width={'100%'}
                      height={'100%'}
                      LinearGradientComponent={LinearGradient}
                      animation="wave"
                    />
                  }
                  source={{
                    uri: replace150with500(trackData?.image) || ''
                  }}
                  contentPosition={'top center'}
                  alt="poster"
                  transition={true}
                  onError={(error) =>
                    console.log('Image failed to load', error)
                  }
                />
              )}
            </View>
          </View>
        </View>
        <View
          style={styles.option_row}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setMainHeight(y);
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              if (isUserLogin) {
                addInQueue(trackData?.songs, trackData?.songs[0], dispatch);
              } else {
                navigation.navigate('authpage');
              }
            }}
            style={[styles.makecenter, styles.option_play]}
          >
            <PlayFillSvg color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
        <View style={[styles.makealigncenter, styles.track_title_box]}>
          <Text
            style={styles.track_title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {decodeHtmlEntities(trackData?.title || '')}
          </Text>
        </View>
        <View style={[styles.makealigncenter, styles.track_desc_box]}>
          <Text
            style={styles.track_desc}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {trackData.desc}
          </Text>
        </View>
      </>
    ),
    [trackData, styles, colors]
  );

  const renderBox = useCallback(
    ({ item }) => (
      <Box
        item={item}
        styles={styles}
        colors={colors}
        currentTrackId={currentTrackId}
        setModalVisible={setModalVisible}
        setThreeBarData={setThreeBarData}
        addSongInQueue={addSongInQueue}
        isUserLogin={isUserLogin}
        addtofavourite={addtofavourite}
        songsArrayId={songsArrayId}
      />
    ),
    [
      styles,
      colors,
      dispatch,
      currentTrackId,
      trackData,
      addtofavourite,
      songsArrayId
    ]
  );

  const addSongInQueue = async (item) => {
    if (isUserLogin) {
      addInQueue(trackData?.songs, item, dispatch);
    } else {
      navigation.navigate('authpage');
    }
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading) return <Spinner color={colors.solidcolor} size={60} />;

  if (error) return <Error error_msg={error?.message} />;

  const addtofavourite = (currentTrack) => {
    const newtrack = {
      ...currentTrack,
      songId: currentTrack.id
    };
    toggleAddtofavourite(newtrack, dispatch, email);
  };

  return (
    <View style={styles.outercontainer}>
      <LinearGradient
        colors={[randomcolors?.dominant || colors.background, 'transparent']}
        style={[
          styles.lineargradient,
          isHeadNavRelative && { display: 'none' }
        ]}
        pointerEvents="none"
      />
      <View
        style={[
          styles.head_nav,
          isHeadNavRelative && { backgroundColor: colors.background }
        ]}
      >
        <View style={[styles.makecenter, styles.back_box]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={[styles.makecenter, styles.back_btn]}
          >
            <BackSvg color={colors.solidcolor} size={30} />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.small_poster_box,
            isHeadNavRelative && {
              display: 'flex',
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {trackData?.image && (
            <Image
              style={styles.song_image}
              PlaceholderContent={
                <Skeleton
                  width={'100%'}
                  height={'100%'}
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                />
              }
              source={{
                uri: trackData?.image || ''
              }}
              contentPosition={'top center'}
              alt="poster"
              transition={true}
              onError={(error) => console.log('Image failed to load', error)}
            />
          )}
        </Animated.View>
        <View style={[styles.makecenter, styles.search_box]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('tracksearch', {
                tracks: trackData.songs
              });
            }}
            style={[styles.makecenter, styles.search_btn]}
          >
            <SearchSvg color={colors.solidcolor} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.container}
        data={trackData.songs || []}
        renderItem={renderBox}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        initialNumToRender={12}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index
        })}
        contentContainerStyle={{
          paddingBottom: isDisplay ? 70 : 0
        }}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThreeBar
          setModalVisible={setModalVisible}
          ThreeBarData={ThreeBarData}
          trackData={trackData.songs}
        />
      </Modal>
    </View>
  );
};

export default memo(AllTracks);
