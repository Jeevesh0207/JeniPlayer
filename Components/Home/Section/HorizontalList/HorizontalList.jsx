import React, { memo, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { createStyles } from './StyleHorizontalList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setVerticalListData, setTrackListID } from '../../../../redux/actions';
import { useTheme } from '../../../../Theme/ThemeContext';
import { Image, Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

//! ------------OUTER FUNCIONS ---------------

const replace150with500 = (url) => {
  return url?.replace('150x150', '500x500') || url;
};

const Box = memo(({ item, module_template, GoToAllTracks, styles }) => (
  <TouchableOpacity
    style={styles.box}
    onPress={() => GoToAllTracks('tracks', item.token, item.type)}
  >
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
  </TouchableOpacity>
));

const SongType = [
  {
    module_name: 'Trending',
    module_template: 'trending'
  },
  {
    module_name: 'New Release Hindi',
    module_template: 'newReleaseHindi'
  },
  {
    module_name: 'New Release English',
    module_template: 'newReleaseEnglish'
  },
  {
    module_name: 'Top Artist',
    module_template: 'topArtist'
  },
  {
    module_name: 'Top Charts',
    module_template: 'topCharts'
  },
  {
    module_name: 'Hindi Playlist',
    module_template: 'topPlaylistHindi'
  },
  {
    module_name: 'English Playlist',
    module_template: 'topPlaylistEnglish'
  },
  {
    module_name: 'Romance',
    module_template: 'getMoodRomance'
  },
  {
    module_name: 'Sad',
    module_template: 'getMoodSad'
  },
  {
    module_name: 'Dance',
    module_template: 'getMoodDance'
  },
  {
    module_name: 'Workout',
    module_template: 'getMoodWorkout'
  },
  {
    module_name: 'Party',
    module_template: 'getMoodParty'
  },
  {
    module_name: 'Devotional',
    module_template: 'getMoodDevotional'
  },
  {
    module_name: 'K-pop',
    module_template: 'getMoodKpop'
  }
];

//! ------------COMPONENT START ---------------

const HorizontalList = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const GoToVertical = useCallback(
    (route, module_data, module_name, module_template) => {
      const obj = {
        data: module_data,
        title: module_name,
        type: module_template
      };
      dispatch(setVerticalListData(obj));
      navigation.navigate(route);
    },
    [dispatch]
  );

  const GoToAllTracks = useCallback(
    (route, token, type) => {
      const obj = {
        token,
        type
      };
      dispatch(setTrackListID(obj));
      navigation.navigate(route);
    },
    [dispatch, navigation]
  );

  const renderBox = useCallback(
    ({ list, module_template }) => (
      <Box
        item={list}
        module_template={module_template}
        GoToAllTracks={GoToAllTracks}
        styles={styles}
      />
    ),
    [GoToAllTracks, styles]
  );
  return (
    <>
      {SongType.map((list, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.head}>
            <Text style={styles.module_name}>{list.module_name}</Text>
            <TouchableOpacity
              onPress={() =>
                GoToVertical(
                  'alllist',
                  data[list.module_template],
                  list.module_name,
                  list.module_template
                )
              }
            >
              <Text style={styles.more}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box_container}>
            <FlatList
              data={data[list.module_template]}
              horizontal
              renderItem={({ item }) =>
                renderBox({ list: item, module_template: list.module_template })
              }
              initialNumToRender={20}
              keyExtractor={(list, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          </View>
        </View>
      ))}
    </>
  );
};

export default memo(HorizontalList);
