import React, {memo, useMemo} from 'react';
import {View, Text} from 'react-native';
import {createStyles} from './StyleSpinner';
import {SpinnerSvg} from '../../Svg';
import { useTheme } from '../../Theme/ThemeContext';

const SpinnerPage = ({color, size}) => {
  const {theme} = useTheme()
  const {colors} = theme
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.makecenter, styles.loading_box]}>
      <SpinnerSvg color={color} size={size} />
      <Text style={styles.loading_text}>Loading</Text>
    </View>
  );
};

export default memo(SpinnerPage);
