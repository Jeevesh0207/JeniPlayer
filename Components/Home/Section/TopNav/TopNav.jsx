import React, { memo,useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { createStyles } from './StyleTopNav';
import { SearchSvg } from '../../../../Svg';
import { useTheme } from '../../../../Theme/ThemeContext';

const TopNav = () => {
  const {theme} = useTheme()
  const {colors} = theme
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.home_nav}>
      <View style={styles.home_nav_left}>
        <View style={[styles.makecenter, styles.logo_box]}>
          <Image
            style={styles.logo}
            source={require('../../../../img/music_1.png')}
            alt="png"
          />
        </View>
        <View style={styles.name_box}>
          <Text style={styles.logo_text}>Welcome back!</Text>
          <Text style={styles.username}>Jeevesh Rai</Text>
        </View>
      </View>
      <View style={[styles.makecenter, styles.home_nav_right]}>
        <TouchableOpacity style={[styles.makecenter, styles.search_icon_box]}>
          <SearchSvg color={colors.dodgerBlueDark} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(TopNav);
