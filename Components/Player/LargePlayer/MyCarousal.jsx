import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import createStyles from './StyleLargePlayer';
import { useTheme } from '../../../Theme/ThemeContext';
import { Image, Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const replace150with500 = (url) => url?.replace('150x150', '500x500') || url;

const windowWidth = Dimensions.get('window').width - 20;

function Carousel({
  queue,
  currentTrackIndex,
  OnMoveSlideSetSong,
  flatListRef
}) {
  const [index, setIndex] = useState(currentTrackIndex);
  const indexRef = useRef(index);
  // Create a ref for FlatList
  indexRef.current = index;

  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    setIndex(currentTrackIndex);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (index !== null && index !== undefined && flatListRef.current) {
      const dataLength = flatListRef.current.props.data.length;
      if (index >= 0 && index < dataLength) {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: false
        });
      } else {
        console.warn(
          `scrollToIndex out of range: requested index ${index} but minimum is 0 and maximum is ${
            dataLength - 1
          }`
        );
      }
    } else {
      console.warn(`scrollToIndex error: invalid index ${index}`);
    }
  }, []);

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      console.log(roundIndex);
      setIndex(roundIndex);
      OnMoveSlideSetSong(roundIndex);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={[styles.makecenter, styles.banner_container]}>
        {item?.image && (
          <Image
            style={styles.banner_image}
            source={{ uri: replace150with500(item?.image) }}
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
    ),
    [styles, colors]
  );

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 3,
    keyExtractor: useCallback((e) => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth
      }),
      []
    )
  };

  // Handle scrollToIndex failure
  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: info.index,
          animated: true
        });
      }
    });
  };

  return (
    <FlatList
      ref={flatListRef}
      data={queue}
      style={{ flex: 1 }}
      renderItem={renderItem}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
      updateCellsBatchingPeriod={100}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );
}

export default memo(Carousel);
