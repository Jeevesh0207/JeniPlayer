import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createStyles } from './StyleError';
import { AlertSvg } from '../../Svg';
import { useNavigation } from '@react-navigation/native';

const ErrorPage = ({ error_msg, refresh }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  console.log(error_msg);

  return (
    <View style={[styles.makecenter, styles.error_box]}>
      <AlertSvg color={colors.solidcolor} size={40} />
      <Text style={styles.error_text}>
        Apologies, something went wrong. Please try again later or contact
        support.
      </Text>
      <View style={[styles.makecenter, styles.error_btn_box]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.makecenter, styles.error_btn]}
        >
          <Text style={styles.error_btn_text}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            refresh();
          }}
          style={[styles.makecenter, styles.error_btn, styles.error_btn_report]}
        >
          <Text style={styles.error_btn_text}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ErrorPage);
