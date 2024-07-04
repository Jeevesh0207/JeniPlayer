import { useMemo, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal
} from 'react-native';
import createStyles from './StyleTrackSearch';
import { useTheme } from '../../../Theme/ThemeContext';
import {
  BackSvg,
  SearchSvg,
  HeartOutlineSvg,
  OneBarMenuSvg,
  NoDataSvg,
  CloseSvg
} from '../../../Svg';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import he from 'he';
import { useDispatch, useSelector } from 'react-redux';
import { addInQueue } from '../../../constants';
import ThreeBar from '../ThreeBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Box = memo(
  ({
    item,
    styles,
    colors,
    dispatch,
    tracks,
    setThreeBarData,
    setModalVisible
  }) => (
    <TouchableOpacity
      onPress={() => {
        addInQueue(tracks, item, dispatch);
      }}
      style={[styles.makealigncenter, styles.song_box]}
    >
      <View style={[styles.makealigncenter, styles.song_left]}>
        <View style={styles.song_image_box}>
          <Image
            style={styles.song_image}
            source={{ uri: item.image || '' }}
            contentPosition={'top center'}
            alt="poster"
            onError={(error) => console.log('Image failed to load', error)}
          />
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
        <View style={[styles.makecenter, styles.song_download_box]}>
          <HeartOutlineSvg color={colors.desc} size={22} />
        </View>
        <TouchableOpacity
          onPress={() => {
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

const TrackSearch = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [query, setQuery] = useState('');
  const { tracks } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [ThreeBarData, setThreeBarData] = useState(null);
  const { isDisplay, currentTrack } = useSelector(
    (state) => state.getTrackPlayerData
  );
  const renderBox = useCallback(
    ({ item }) => (
      <Box
        item={item}
        styles={styles}
        colors={colors}
        dispatch={dispatch}
        tracks={tracks}
        currentTrack={currentTrack}
        setThreeBarData={setThreeBarData}
        setModalVisible={setModalVisible}
      />
    ),
    [styles, colors, dispatch]
  );

  const filterResult = useMemo(
    () =>
      tracks.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      ),
    [tracks, query]
  );

  const ClearQuery = () => {
    setQuery('');
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.makecenter, styles.head]}>
        <View style={[styles.makecenter, styles.back_box]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.makecenter, styles.back_btn]}
            accessibilityLabel="Go back"
          >
            <BackSvg color={colors.solidcolor} size={30} />
          </TouchableOpacity>
        </View>
        <View style={[styles.makecenter, styles.head_title_box]}>
          {/* <Text style={styles.head_title_text}>Track</Text> */}
        </View>
      </View>
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
      {query == '' ? (
        <FlatList
          data={tracks || []}
          renderItem={renderBox}
          keyExtractor={keyExtractor}
          initialNumToRender={12}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index
          })}
          contentContainerStyle={{
            paddingBottom: isDisplay ? 70 : 0
          }}
        />
      ) : filterResult.length > 0 ? (
        <FlatList
          data={filterResult || []}
          renderItem={renderBox}
          keyExtractor={keyExtractor}
          initialNumToRender={12}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index
          })}
          contentContainerStyle={{
            paddingBottom: isDisplay ? 70 : 0
          }}
        />
      ) : (
        <View style={styles.noresult_container}>
          <NoDataSvg color={colors.solidcolor} size={70} />
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
          trackData={tracks}
        />
      </Modal>
    </GestureHandlerRootView>
  );
};

export default TrackSearch;
