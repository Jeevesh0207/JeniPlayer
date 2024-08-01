import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useTheme } from '../../../Theme/ThemeContext';
import { createStyles } from './StyleLogin';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Image, Skeleton } from '@rneui/themed';
import { EmailSvg, OpenEyeSvg, CloseEyeSvg, PasswordSvg } from '../../../Svg';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API_URL } from '@env';
import { showToast } from '../../../constants';
import { setUserData } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isloading, setisloading] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const storeData = async (value, key) => {
    try {
      const Value = JSON.stringify(value);
      await AsyncStorage.setItem(key, Value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    setisloading(true);
    const Obj = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(API_URL + '/login', Obj);
      const result = response.data;
      if (result.ok) {
        const userObj = {
          fullName: result.fullName,
          email: email
        };
        showToast('success', 'Login Successful', 'Welcome back!');
        storeData(result.token, 'cookies');
        storeData(userObj, 'loginUserData');
        dispatch(setUserData({ isUserLogin: true, ...userObj }));
        setEmail('');
        setPassword('');
        navigation.navigate('home');
      } else {
        showToast('error', 'Login Failed', result.msg);
      }
    } catch (error) {
      showToast('error', 'Login Failed', error.response.data.msg);
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
          <Text style={styles.title}>Sign In</Text>
          {/* to Jeni Player */}
          <Text style={styles.subtitle}>
            Access your personalized music library and enjoy your favorite tunes
            anytime, anywhere.
          </Text>
          <Input
            style={styles.inputbox}
            placeholder="Email"
            leftIcon={<EmailSvg color={colors.solidcolor} />}
            onChangeText={setEmail}
          />
          <Input
            style={styles.inputbox}
            placeholder="Password"
            leftIcon={<PasswordSvg color={colors.solidcolor} />}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {passwordVisible ? (
                  <OpenEyeSvg color={colors.solidcolor} />
                ) : (
                  <CloseEyeSvg color={colors.solidcolor} />
                )}
              </TouchableOpacity>
            }
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <Pressable
            style={styles.forgotbtn}
            onPress={() => {
              navigation.navigate('reset');
            }}
          >
            <Text style={styles.forgottext}>Forgot Password?</Text>
          </Pressable>
          <Button
            title="Sign In"
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
            onPress={handleSignIn}
          />
          <View style={styles.createcontainer}>
            <Text style={styles.createbox}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('signup');
              }}
            >
              <Text style={styles.createtext}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
