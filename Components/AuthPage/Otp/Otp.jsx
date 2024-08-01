import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import { createStyles } from './StyleOtp';
import { useNavigation } from '@react-navigation/native';
import { Button, Image, Skeleton, Input } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@env';
import { showToast } from '../../../constants';

const OtpVerification = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { fullname, email, password } = useSelector(
    (state) => state.getUserData
  );

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isloading, setisloading] = useState(false);
  const [isresendloading, setresendloading] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (value) => {
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleResendOtp = async () => {
    setresendloading(true);
    try {
      const response = await axios.post(API_URL + '/resendotp', { email });
      const result = response.data;
      if (result.ok) {
        showToast(
          'success',
          'OTP Resent',
          'We have sent a new OTP to your registered email.'
        );
        setTimer(30);
      } else {
        showToast('error', 'Resend Failed', result.msg);
      }
    } catch (error) {
      showToast('error', 'Resend Failed', error.response.data.msg);
    } finally {
      setresendloading(false);
      setIsButtonDisabled(true);
    }
  };

  const handleVerifyOtp = async () => {
    const Obj = {
      fullname,
      email,
      password,
      user_otp: otp
    };
    try {
      setisloading(true);
      setIsButtonDisabled(true);
      const response = await axios.post(API_URL + '/signup', Obj);
      const result = response.data;
      if (result.ok) {
        showToast(
          'success',
          'Verification Successful',
          'You have been registered successfully.'
        );
        setOtp('')
        navigation.navigate('login');
      } else {
        showToast('error', 'Verification Failed', result.msg);
      }
    } catch (error) {
      showToast('error', 'Verification Failed', error.response.data.msg);
    } finally {
      setIsButtonDisabled(false);
      setisloading(false);
    }
  };

  return (
    <View style={styles.bannerContainer}>
      <Image
        style={styles.banner}
        source={require('../../../img/Auth/banner.jpg')}
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
      <View style={[styles.makecenter, styles.container]}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit OTP sent to your registered email address
        </Text>
        <Text style={styles.subtitleemail}>{email}</Text>
        <View style={styles.otpContainer}>
          <Input
            style={[styles.inputbox]}
            placeholder="* * * *"
            keyboardType="numeric"
            value={otp}
            onChangeText={handleOtpChange}
            maxLength={4}
            multiline={true}
            autoFocus={true}
          />
        </View>
        <Pressable
          style={[styles.resendbtn, isButtonDisabled && styles.disabledButton]}
          onPress={handleResendOtp}
          disabled={isButtonDisabled}
        >
          {isresendloading ? (
            <ActivityIndicator  style={{
              marginRight:10
            }}
            color={colors.solidcolor}
            />
          ) : (
            <Text
              style={[
                styles.resendtext,
                isButtonDisabled && styles.disabledtext
              ]}
            >
              Resend OTP {!isloading && isButtonDisabled && `in ${timer}s`}
            </Text>
          )}
        </Pressable>
        <Button
          title="Verify OTP"
          loading={isloading}
          loadingProps={{
            size: 'small',
            color: 'rgba(111, 202, 186, 1)'
          }}
          titleStyle={styles.btntext}
          buttonStyle={styles.btn}
          onPress={handleVerifyOtp}
          containerStyle={{
            width: '100%',
            marginVertical: 15
          }}
        />
        <View style={styles.createcontainer}>
          <Text style={styles.createbox}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}
          >
            <Text style={styles.createtext}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpVerification;
