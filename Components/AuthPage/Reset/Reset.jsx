import React, { useState, useMemo, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import { createStyles } from './StyleReset';
import { useNavigation } from '@react-navigation/native';
import { Button, Image, Skeleton, Input } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API_URL } from '@env';
import { showToast, validatePassword } from '../../../constants';
import { OpenEyeSvg, CloseEyeSvg } from '../../../Svg';

const Reset = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isloading, setisloading] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setotp] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isresendloading, setresendloading] = useState(false);

  const [step, setStep] = useState('verify');

  const togglePasswordVisibility1 = (e) => {
    e.preventDefault();
    setPasswordVisible1(!passwordVisible1);
  };

  const togglePasswordVisibility2 = (e) => {
    e.preventDefault();
    setPasswordVisible2(!passwordVisible2);
  };

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

  const handleResendOtp = async () => {
    setresendloading(true);
    try {
      const response = await axios.post(API_URL + '/resendotp', {
        email,
        subject: 'Password Reset'
      });
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

  const handleVerifyEmail = async () => {
    setisloading(true);
    try {
      const response = await axios.post(API_URL + '/checkemailforgot', {
        email
      });
      const result = response.data;
      if (result.ok) {
        showToast(
          'success',
          'Email Verification',
          'We have sent a verification code to your registered email.'
        );
        setStep('otp');
        setTimer(30);
      }
    } catch (error) {
      showToast('error', 'Verification Failed', error.response.data.msg);
    } finally {
      setisloading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validatePassword(password)) {
      return;
    }
    if (password !== reenterPassword) {
      showToast('error', 'Password Mismatch', 'Passwords do not match.');
      return;
    }
    setisloading(true);
    try {
      const response = await axios.post(API_URL + '/forgot', {
        email,
        user_otp: otp,
        password
      });
      const result = response.data;
      if (result.ok) {
        showToast(
          'success',
          'Reset Successful',
          'Your password has been reset.'
        );
        navigation.navigate('login');
      }
    } catch (error) {
      showToast('error', 'Reset Failed', error.response.data.msg);
    } finally {
      setisloading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.bannerContainer}
        keyboardShouldPersistTaps="handled"
      >
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
          {step === 'verify' && (
            <>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Please enter your email to receive a verification code.
              </Text>
              <Input
                style={styles.inputbox}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button
                title="Submit"
                loading={isloading}
                onPress={handleVerifyEmail}
                loadingProps={{
                  size: 'small',
                  color: 'rgba(111, 202, 186, 1)'
                }}
                titleStyle={styles.btntext}
                buttonStyle={styles.btn}
                containerStyle={{
                  width: '100%',
                  marginVertical: 15
                }}
              />
              <View style={styles.createcontainer}>
                <Text style={styles.createbox}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text style={styles.createtext}>Create an account</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'otp' && (
            <>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter the 4-digit OTP sent to your registered email address.
              </Text>
              <Input
                style={[
                  styles.inputbox,
                  {
                    textAlign: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 18,
                    color: '#fff',
                    width: '100%'
                  }
                ]}
                placeholder="* * * *"
                value={otp}
                onChangeText={(text) => setotp(text)}
                keyboardType="number-pad"
                autoCapitalize="none"
                multiline={true}
                maxLength={4}
              />
              <Pressable
                style={[
                  styles.resendbtn,
                  isButtonDisabled && styles.disabledButton
                ]}
                onPress={handleResendOtp}
                disabled={isButtonDisabled}
              >
                {isresendloading ? (
                  <ActivityIndicator
                    style={{
                      marginRight: 10
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
                    Resend OTP{' '}
                    {!isloading && isButtonDisabled && `in ${timer}s`}
                  </Text>
                )}
              </Pressable>
              <Text style={styles.subtitle}>
                Enter a new password for your account.
              </Text>
              <View style={styles.otpContainer}>
                <Input
                  style={styles.inputbox}
                  placeholder="New Password"
                  secureTextEntry={!passwordVisible1}
                  onChangeText={(text) => setPassword(text)}
                  rightIcon={
                    <TouchableOpacity onPress={togglePasswordVisibility1}>
                      {passwordVisible1 ? (
                        <OpenEyeSvg color={colors.solidcolor} />
                      ) : (
                        <CloseEyeSvg color={colors.solidcolor} />
                      )}
                    </TouchableOpacity>
                  }
                />
                <Input
                  style={styles.inputbox}
                  placeholder="Confirm New Password"
                  secureTextEntry={!passwordVisible2}
                  onChangeText={(text) => setReenterPassword(text)}
                  rightIcon={
                    <TouchableOpacity onPress={togglePasswordVisibility2}>
                      {passwordVisible2 ? (
                        <OpenEyeSvg color={colors.solidcolor} />
                      ) : (
                        <CloseEyeSvg color={colors.solidcolor} />
                      )}
                    </TouchableOpacity>
                  }
                />
              </View>
              <Button
                title="Change Password"
                loading={isloading}
                onPress={handleVerifyOtp}
                loadingProps={{
                  size: 'small',
                  color: 'rgba(111, 202, 186, 1)'
                }}
                titleStyle={styles.btntext}
                buttonStyle={styles.btn}
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
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Reset;
