import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { createStyles } from './StyleSearch';
import { useTheme } from '../../Theme/ThemeContext';
import {
  SearchSvg,
  CloseSvg,
  HeartOutlineSvg,
  OneBarMenuSvg,
  AnimatedPlaySong,
  NoDataSvg,
  HeartFillSvg
} from '../../Svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ThreeBar from '../AllTracks/ThreeBar';
import { useQuery, gql } from '@apollo/client';
import he from 'he';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Skeleton } from '@rneui/themed';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import { addInQueue } from '../../constants';
import { UpperLoading } from '../../constants/Template';
import { toggleAddtofavourite } from '../../constants';


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
      onPress={() => {
        addSongInQueue(item);
      }}
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
        <TouchableOpacity style={[styles.makecenter, styles.song_download_box]} onPress={()=>{
          addtofavourite(item)
        }}>
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

const decodeHtmlEntities = (html) => he.decode(html);

const typedef = gql`
  query GET_DEFAULT_SEARCH {
    getSearchTemplate {
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

const searchtypedef = gql`
  query GET_SEARCH($query: String) {
    getSearch(query: $query) {
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
`;

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [query, setQuery] = useState('');
  const [defaultTrackList, setDefaultTrackList] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ThreeBarData, setThreeBarData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchresult, setSearchResult] = useState(null);
  const { isUserLogin,email } = useSelector((state) => state.getUserData);
  const { songs } = useSelector((state) => state.getFetchTrack);
  const { loading, error, data, refetch } = useQuery(typedef);
  const { songsArrayId } = useSelector((state) => state.getFavouriteSong);

  const {
    loading: searchloading,
    error: searcherror,
    data: searchdata
  } = useQuery(searchtypedef, {
    variables: {
      query: query
    }
  });

  const { currentTrack, isDisplay } = useSelector(
    (state) => state.getTrackPlayerData
  );

  useEffect(() => {
    if (data && defaultTrackList.length === 0) {
      setDefaultTrackList(data['getSearchTemplate']);
    }
  }, [data, defaultTrackList]);

  useEffect(() => {
    if (searchdata !== null && searchdata?.getSearch.length > 0) {
      // console.log(searchdata?.getSearch[0])
      setSearchResult(searchdata?.getSearch ?? []);
    }
  }, [searchdata]);

  const addtofavourite = (currentTrack) => {
    const newtrack ={
      ...currentTrack,
      songId:currentTrack.id
    }
    toggleAddtofavourite(newtrack, dispatch, email,"search");
  };

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
    [styles, colors, currentTrackId, isUserLogin,addSongInQueue,addtofavourite,songsArrayId]
  );

  const addSongInQueue = async (item) => {
    if (isUserLogin) {
      if (item) {
        // const songsToUse = query === '' ? defaultTrackList.songs : searchresult;
        addInQueue([item], item, dispatch);
      } else {
        console.log('Queue is Empty');
      }
    } else {
      navigation.navigate('authpage');
    }
  };

  useEffect(() => {
    if (currentTrack !== null) {
      setCurrentTrackId(currentTrack?.songId);
    }
  }, [currentTrack]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const ClearQuery = () => {
    setQuery('');
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error('Refetch error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading || refreshing)
    return <Spinner color={colors.solidcolor} size={60} />;

  if (error) return <Error error_msg={error?.message} refresh={refresh} />;

  return (
    <View style={styles.container}>
      <View style={styles.search_box}>
        <View style={styles.search_input_box}>
          <TextInput
            style={styles.search_input}
            placeholder="Search"
            placeholderTextColor={colors.solidcolor}
            value={query}
            onChangeText={setQuery}
            keyboardType="default"
            accessibilityLabel="Search input"
          />
        </View>
        <View style={[styles.makecenter, styles.search_icon_box]}>
          {query === '' ? (
            <SearchSvg color={colors.solidcolor} size={30} />
          ) : (
            <TouchableOpacity onPress={ClearQuery}>
              <CloseSvg color={colors.solidcolor} size={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {query === '' ? (
        <FlatList
          data={defaultTrackList.songs || []}
          renderItem={renderBox}
          keyExtractor={keyExtractor}
          initialNumToRender={12}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index
          })}
          contentContainerStyle={{
            paddingBottom: isDisplay ? 70 : 0
          }}
        />
      ) : searchloading ? (
        <UpperLoading />
      ) : searchresult?.length > 0 ? (
        <FlatList
          data={searchresult || []}
          renderItem={renderBox}
          keyExtractor={keyExtractor}
          initialNumToRender={12}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index
          })}
          contentContainerStyle={{
            paddingBottom: isDisplay ? 70 : 0
          }}
        />
      ) : (
        <View style={styles.noresult_container}>
          <NoDataSvg color={colors.solidcolor_C1} size={70} />
          <Text style={styles.noresult_text}>No Data Found</Text>
        </View>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThreeBar
          setModalVisible={setModalVisible}
          ThreeBarData={ThreeBarData}
          trackData={[ThreeBarData]}
        />
      </Modal>
    </View>
  );
};

export default memo(Search);
