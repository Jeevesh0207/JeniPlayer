import {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../../Theme/ThemeContext';
import createStyles from './StyleMiniPlayer';
import {HeartOutlineSvg, PlayFillSvg} from '../../../Svg';
import Slider from '@react-native-community/slider';

const MiniPlayer = () => {
  const {theme} = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentProgress,setCurrentProgress] =useState(0)

  const GetProgress = (event) =>{
    console.log(event)
  }
 
  return (
    <View style={[styles.makecenter, styles.container]}>
      <View style={[styles.outerplayerbox]}>
        <View style={[styles.makealigncenter, styles.playerbox]}>
          <View style={styles.poster_box}></View>
          <View style={styles.detailbox}>
            <Text style={styles.title}>Tumse Pyaar Hua</Text>
            <Text style={styles.desc}>Rashid Khan</Text>
          </View>
          <View style={[styles.makecenter, styles.fav_box]}>
            <HeartOutlineSvg color={colors.solidcolor} size={25} />
          </View>
          <View style={[styles.makecenter, styles.playpausebox]}>
            <PlayFillSvg color={colors.solidcolor} size={20} />
          </View>
        </View>
        <View style={styles.progressbox}>
          <Slider
            style={styles.progressbar}
            minimumValue={0}
            maximumValue={100}
            step={1}
            lowerLimit={0}
            value={currentProgress}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor={colors.solidcolor}
            onSlidingStart={GetProgress}
            onValueChange={(value)=>setCurrentProgress(value)}
            thumbTintColor="transparent" 
            tapToSeek={true}
          />
        </View>
      </View>
    </View>
  );
};

export default MiniPlayer;
