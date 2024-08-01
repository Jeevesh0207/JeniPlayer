import React, { useState, memo, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  FlatList
} from 'react-native';
import { createStyles } from './StyleVerticalList';
import LinearGradient from 'react-native-linear-gradient';
import { BackSvg, SearchSvg, NoDataSvg, CloseSvg } from '../../../../Svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setTrackListID } from '../../../../redux/actions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '../../../../Theme/ThemeContext';
import { Image,Skeleton } from '@rneui/themed';

//! ------------OUTER FUNCIONS ---------------
const minCols = 3;
const calcNumColumns = (width, styles) => {
  const cols = width / styles.box.width;
  const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  const colsMinusMargin = cols - 2 * colsFloor * styles.box.margin;
  return colsMinusMargin < colsFloor && colsFloor > minCols
    ? colsFloor - 1
    : colsFloor;
};

const replace150with500 = (url) => {
  return url?.replace('150x150', '500x500') || url;
};

const Box = memo(
  ({ item, module_template, numColumns, GoToAllTracks, styles }) => (
    <TouchableOpacity
      style={styles.box(numColumns)}
      accessibilityLabel={`Item ${item.title}`}
      onPress={() => GoToAllTracks('tracks', item.token, item.type)}
    >
      <View>
        <View style={styles.image_box(module_template)}>
          {item?.image && (
            <Image
              style={styles.poster}
              PlaceholderContent={
                <Skeleton
                  width={'100%'}
                  height={'100%'}
                  LinearGradientComponent={LinearGradient}
                  animation="wave"
                />
              }
              source={{
                uri: replace150with500(item?.image) || ''
              }}
              contentPosition={'top center'}
              alt="poster"
              transition={true}
              onError={(error) => console.log('Image failed to load', error)}
            />
          )}
        </View>
        <Text
          style={styles.title(module_template)}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.title ?? ''}
        </Text>
        <Text
          style={styles.desc(module_template)}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.desc}
        </Text>
      </View>
    </TouchableOpacity>
  )
);

//! ------------COMPONENT START ---------------

const VerticalList = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch = useDispatch();
  const { TrackLists, type, title } = useSelector(
    (state) => state.getVerticalListData
  );
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(calcNumColumns(width, styles));
  const [query, setQuery] = useState('');
  const { isDisplay } = useSelector((state) => state.getTrackPlayerData);

  useEffect(() => {
    setNumColumns(calcNumColumns(width, styles));
  }, [width, styles]);

  const filterResult = useMemo(
    () =>
      TrackLists.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      ),
    [TrackLists, query]
  );

  const GoToAllTracks = useCallback(
    (route, token, type) => {
      dispatch(setTrackListID({ token, type }));
      navigation.navigate(route);
    },
    [dispatch, navigation]
  );

  const ClearQuery = () => {
    setQuery('');
  };

  const renderBox = useCallback(
    ({ item }) => (
      <Box
        item={item}
        module_template={type}
        numColumns={numColumns}
        GoToAllTracks={GoToAllTracks}
        styles={styles}
      />
    ),
    [type, numColumns, GoToAllTracks, styles]
  );

  return (
    <View style={styles.container}>
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
          <Text style={styles.head_title_text}>{title}</Text>
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.tracks_container}>
          {query === '' ? (
            <FlatList
              data={TrackLists}
              numColumns={numColumns}
              renderItem={renderBox}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: isDisplay ? 35 : 0
              }}
            />
          ) : filterResult.length > 0 ? (
            <FlatList
              data={filterResult}
              numColumns={numColumns}
              renderItem={renderBox}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: isDisplay ? 35 : 0
              }}
            />
          ) : (
            <View style={styles.noresult_container}>
              <NoDataSvg color={colors.solidcolor_C1} size={70} />
              <Text style={styles.noresult_text}>No Data Found</Text>
            </View>
          )}
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

export default memo(VerticalList);
