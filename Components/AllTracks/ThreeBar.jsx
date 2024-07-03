import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createThreeStyles } from './StyleThreeBar';
import { Image } from 'expo-image';
import he from 'he'
import {
  AddInQueueSvg,
  AddToPlaylistSvg,
  DownloadSvg,
  HeartOutlineSvg,
  PlayAsNextSvg,
  PlayOutlineSvg
} from '../../Svg';

const decodeHtmlEntities = (html) => he.decode(html);

const replace150with500 = (url) => url?.replace('150x150', '500x500') || url;

const ThreeBar = ({setModalVisible,ThreeBarData}) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createThreeStyles(colors), [colors]);
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={styles.posterbox}>
          <View style={styles.poster}>
            <Image
              style={styles.poster_image}
              source={{
                uri: replace150with500(ThreeBarData?.image) ?? ""
              }}
              contentPosition={'top center'}
              alt="poster"
              onError={(error) => console.log('Image failed to load', error)}
            />
          </View>
          <View style={[styles.makecenter, styles.title]}>
            <Text style={styles.titletext}>{decodeHtmlEntities(ThreeBarData?.title)}</Text>
          </View>
          <View style={[styles.makecenter, styles.desc]}>
            <Text style={styles.desctext}>
             {decodeHtmlEntities(ThreeBarData?.desc)}
            </Text>
          </View>
        </View>
        <View style={styles.optionscontainer}>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <PlayOutlineSvg size={18} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Play Now</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <HeartOutlineSvg size={20} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Save to Library</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <AddToPlaylistSvg size={20} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Add to Playlist</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <AddInQueueSvg size={21} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Add to Queue</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <PlayAsNextSvg size={21} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Play Next</Text>
          </View>
          <View style={[styles.makealigncenter, styles.rowbox]}>
            <View style={[styles.makecenter, styles.rowbannerbox]}>
              <DownloadSvg size={22} color={colors.solidcolor} />
            </View>
            <Text style={styles.rowtext}>Download</Text>
          </View>
        </View>
        <View style={styles.closebox}>
          <TouchableOpacity
           onPress={()=>{setModalVisible(false)}}
           style={[styles.makecenter, styles.closecontainer]}>
            <Text style={styles.closetext}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ThreeBar;
