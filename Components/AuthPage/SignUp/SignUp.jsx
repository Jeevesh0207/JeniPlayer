import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import { createStyles } from './StyleSignUp';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Image, Skeleton } from '@rneui/themed';
import {
  EmailSvg,
  OpenEyeSvg,
  CloseEyeSvg,
  PasswordSvg,
  NameSvg
} from '../../../Svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  validateEmail,
  validateName,
  validatePassword,
  showToast
} from '../../../constants';
import { API_URL } from '@env';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/actions';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isloading, setisloading] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  const togglePasswordVisibility1 = (e) => {
    e.preventDefault();
    setPasswordVisible1(!passwordVisible1);
  };

  const togglePasswordVisibility2 = (e) => {
    e.preventDefault();
    setPasswordVisible2(!passwordVisible2);
  };

  const handleSignUp = async () => {
    if (!validateName(fullName)) {
      return;
    }
    if (!validateEmail(email)) {
      return;
    }
    if (!validatePassword(password)) {
      return;
    }
    if (password !== reenterPassword) {
      showToast('error', 'Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setisloading(true);
      const response = await axios.post(API_URL + '/checkemailsignup', {
        email
      });
      const result = response.data;
      if (result.ok) {
        showToast('success', 'Email Verification', result.msg);
        dispatch(
          setUserData({
            fullname:fullName,
            email,
            password
          })
        );
        setFullName('')
        setEmail('')
        setPassword('')
        setReenterPassword('')
        navigation.navigate('otp');
      } else {
        showToast('error', 'Something went wrong', result.msg);
      }
    } catch (error) {
      showToast('error', 'Email already registered', error.response.data.msg);
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
          <Text style={styles.title}>Sign Up</Text>
          {/* to Jeni Player */}
          <Text style={styles.subtitle}>
            Join now to discover a world of music tailored to your taste. Create
            your account and start your musical journey today.
          </Text>

          <Input
            style={styles.inputbox}
            placeholder="Full Name"
            leftIcon={<NameSvg color={colors.solidcolor} />}
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
            style={styles.inputbox}
            placeholder="Email"
            leftIcon={<EmailSvg color={colors.solidcolor} />}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            style={styles.inputbox}
            placeholder="Create Password"
            leftIcon={<PasswordSvg color={colors.solidcolor} />}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility1}>
                {passwordVisible1 ? (
                  <OpenEyeSvg color={colors.solidcolor} />
                ) : (
                  <CloseEyeSvg color={colors.solidcolor} />
                )}
              </TouchableOpacity>
            }
            secureTextEntry={!passwordVisible1}
            value={password}
            onChangeText={setPassword}
          />
          <Input
            style={styles.inputbox}
            placeholder="Re-enter Password"
            leftIcon={<PasswordSvg color={colors.solidcolor} />}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility2}>
                {passwordVisible2 ? (
                  <OpenEyeSvg color={colors.solidcolor} />
                ) : (
                  <CloseEyeSvg color={colors.solidcolor} />
                )}
              </TouchableOpacity>
            }
            secureTextEntry={!passwordVisible2}
            value={reenterPassword}
            onChangeText={setReenterPassword}
          />
          <Button
            title="Sign Up"
            loading={isloading}
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
            onPress={handleSignUp}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
