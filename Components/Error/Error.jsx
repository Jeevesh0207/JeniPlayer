import React,{memo,useMemo} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createStyles } from './StyleError';
import { AlertSvg } from '../../Svg';

const ErrorPage = ({ error_msg }) => {
  const {theme} = useTheme()
  const {colors} = theme
  const styles = useMemo(() => createStyles(colors), [colors]);
  
  console.log(error_msg);

  return (
    <View style={[styles.makecenter, styles.error_box]}>
      <AlertSvg color={colors.dodgerBlueDark} size={40} />
      <Text style={styles.error_text}>
        Apologies, something went wrong. Please try again later or contact support.
      </Text>
      <View style={[styles.makecenter, styles.error_btn_box]}>
        <TouchableOpacity style={[styles.makecenter, styles.error_btn]}>
          <Text style={styles.error_btn_text}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.makecenter, styles.error_btn, styles.error_btn_report]}
        >
          <Text style={styles.error_btn_text}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ErrorPage);
