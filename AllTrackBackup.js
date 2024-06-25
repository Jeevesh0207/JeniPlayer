import {memo} from 'react';
import {View, Text, TouchableOpacity, ScrollView,FlatList} from 'react-native';
import styles from './StyleAllTracks';
import {Image} from 'expo-image';
import {colors} from '../../constants';
import {
  BackSvg,
  HeartOutlineSvg,
  PlayFillSvg,
  SearchSvg,
  ThreeDotSvg,
} from '../../Svg';

import Playlist from '../../Json/Playlist.json';

const Box = memo(({item}) => {
  return (
    <View style={[styles.makealigncenter, styles.song_box]}>
      <View style={[styles.makealigncenter, styles.song_left]}>
        <View style={styles.song_image_box}>
          <Image
            style={styles.song_image}
            source={{
              uri: item.image || '',
            }}
            contentPosition={'top center'}
            alt="poster"
            onError={error => console.log('Image failed to load', error)}
          />
        </View>
        <View style={styles.song_details_box}>
          <Text
            style={styles.song_details_title}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            style={styles.song_details_desc}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.desc}
          </Text>
        </View>
      </View>
      <View style={[styles.makealigncenter, styles.song_right]}>
        <View style={styles.song_download_box}></View>
        <View style={styles.song_three_dot}></View>
      </View>
    </View>
  );
});

const AllTracks = () => {
  const renderBox = ({item}) => <Box item={item} />;

  return (
    <View style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.top_banner}>
        <View style={styles.head_nav}>
          <View style={[styles.makecenter, styles.back_box]}>
            <TouchableOpacity style={[styles.makecenter, styles.back_btn]}>
              <BackSvg color={colors.dodgerBlueDark} size={30} />
            </TouchableOpacity>
          </View>
          <View style={[styles.makecenter, styles.search_box]}>
            <TouchableOpacity style={[styles.makecenter, styles.search_btn]}>
              <SearchSvg color={colors.dodgerBlueDark} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.makecenter, styles.poster_container]}>
          <View style={styles.poster_box}>
            <Image
              style={styles.song_image}
              source={{
                uri: Playlist.data.getPlaylistById.image || '',
              }}
              contentPosition={'top center'}
              alt="poster"
              onError={error => console.log('Image failed to load', error)}
            />
          </View>
        </View>
      </View>
      <View style={styles.option_row}>
        <TouchableOpacity style={[styles.makecenter, styles.option_heart]}>
          <HeartOutlineSvg color={colors.dodgerBlueDark} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.makecenter, styles.option_play]}>
          <PlayFillSvg color={colors.dodgerBlueDark} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.makecenter, styles.option_threedot]}>
          <ThreeDotSvg color={colors.dodgerBlueDark} size={22} />
        </TouchableOpacity>
      </View>
      <View style={[styles.makealigncenter, styles.track_title_box]}>
        <Text style={styles.track_title} numberOfLines={1} ellipsizeMode="tail">
          {Playlist.data.getPlaylistById.title}
        </Text>
      </View>
      <View style={[styles.makealigncenter, styles.track_desc_box]}>
        <Text style={styles.track_desc} numberOfLines={1} ellipsizeMode="tail">
          {Playlist.data.getPlaylistById.desc}
        </Text>
      </View>
      <View style={styles.songs_container}>
        <FlatList
          data={Playlist.data.getPlaylistById.songs}
          horizontal={false}
          renderItem={renderBox}
          initialNumToRender={12}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default AllTracks;
