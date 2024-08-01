import { useMemo } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createStyles } from './StyleLibrary';
import { BackSvg } from '../../Svg';
import TrackSearch from './TrackList/TrackList';

const Library = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <TrackSearch />;
};

export default Library;
