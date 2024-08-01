import React, { useState, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../Theme/ThemeContext';
import { createStyles } from './StyleProfile';
import { useDispatch } from 'react-redux';

import {
  BackSvg,
  RightDirectionSvg,
  PremiumSvg,
  UserProfile,
  TransactionHistorySvg,
  SettingSvg,
  HelpCenterSvg,
  LogoutSvg
} from '../../Svg';
import { useNavigation } from '@react-navigation/native';
import { Image, Skeleton } from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { setUserData } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';

const MainComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme, toggleTheme, toggleType, type } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [selectedTheme, setSelectedTheme] = useState(type);
  const { fullName } = useSelector((state) => state.getUserData);
  const [logoutModel, setlogoutModel] = useState(false);
  const [commingSoon, setcommingSoon] = useState(false);
  const handleLogOut = async () => {
    await AsyncStorage.removeItem('cookies');
    await AsyncStorage.removeItem('loginUserData');
    await TrackPlayer.reset();
    dispatch(setUserData({ isUserLogin: false, fullName: '', email: '' }));
    navigation.navigate('home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.makecenter, styles.head]}>
        <View style={[styles.makecenter, styles.back_box]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.makecenter, styles.back_btn]}
            accessibilityLabel="Go back"
          >
            <BackSvg color={colors.solidcolor} size={30} />
          </TouchableOpacity>
        </View>
        <View style={[styles.makecenter, styles.head_title_box]}>
          <Text style={styles.head_title_text}>Profile</Text>
        </View>
      </View>
      <View style={[styles.makecenter, styles.poster_container]}>
        <View style={styles.poster_box}>
          <Image
            style={styles.poster}
            PlaceholderContent={
              <Skeleton
                width={'100%'}
                height={'100%'}
                LinearGradientComponent={LinearGradient}
                animation="wave"
              />
            }
            source={require('../../img/avatar/default_profile.jpg')}
            contentPosition={'top center'}
            alt="poster"
            transition={true}
            onError={(error) => console.log('Image failed to load', error)}
          />
        </View>
        <Text style={styles.poster_name}>{fullName ? fullName : 'Guest'}</Text>
      </View>
      <TouchableOpacity style={[styles.makecenter, styles.plan_container]} onPress={()=>{setcommingSoon(true)}}>
        <View style={styles.plan_box}>
          <View style={styles.plan_box_left}>
            <View style={[styles.makecenter, styles.plan_image]}>
              <PremiumSvg color={colors.background} size={28} />
            </View>
            <View style={styles.plan_details}>
              <Text style={styles.plan_name}>Get Premium Plan</Text>
              <Text style={styles.plan_price}>$0.00</Text>
            </View>
          </View>
          <View style={[styles.makecenter, styles.plan_box_right]}>
            <RightDirectionSvg size={25} color={colors.background} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option_box} onPress={()=>{setcommingSoon(true)}}>
        <View style={styles.option_box_left}>
          <View style={[styles.makecenter, styles.option_image]}>
            <UserProfile color={colors.solidcolor} size={22} />
          </View>
          <View style={styles.option_details}>
            <Text style={styles.option_name}>Your Profile</Text>
          </View>
        </View>
        <View style={[styles.makecenter, styles.option_box_right]}>
          <RightDirectionSvg size={25} color={colors.solidcolor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option_box} onPress={()=>{setcommingSoon(true)}}>
        <View style={styles.option_box_left}>
          <View style={[styles.makecenter, styles.option_image]}>
            <TransactionHistorySvg color={colors.solidcolor} size={22} />
          </View>
          <View style={styles.option_details}>
            <Text style={styles.option_name}>Transaction History</Text>
          </View>
        </View>
        <View style={[styles.makecenter, styles.option_box_right]}>
          <RightDirectionSvg size={25} color={colors.solidcolor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option_box} onPress={()=>{setcommingSoon(true)}}>
        <View style={styles.option_box_left}>
          <View style={[styles.makecenter, styles.option_image]}>
            <SettingSvg color={colors.solidcolor} size={22} />
          </View>
          <View style={styles.option_details}>
            <Text style={styles.option_name}>Setting</Text>
          </View>
        </View>
        <View style={[styles.makecenter, styles.option_box_right]}>
          <RightDirectionSvg size={25} color={colors.solidcolor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option_box} onPress={()=>{setcommingSoon(true)}}>
        <View style={styles.option_box_left}>
          <View style={[styles.makecenter, styles.option_image]}>
            <HelpCenterSvg color={colors.solidcolor} size={22} />
          </View>
          <View style={styles.option_details}>
            <Text style={styles.option_name}>Help Center</Text>
          </View>
        </View>
        <View style={[styles.makecenter, styles.option_box_right]}>
          <RightDirectionSvg size={25} color={colors.solidcolor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setlogoutModel(true)}
        style={styles.option_box}
      >
        <View style={styles.option_box_left}>
          <View style={[styles.makecenter, styles.option_image]}>
            <LogoutSvg color={colors.solidcolor} size={22} />
          </View>
          <View style={styles.option_details}>
            <Text style={styles.option_name}>Logout</Text>
          </View>
        </View>
        <View style={[styles.makecenter, styles.option_box_right]}>
          <RightDirectionSvg size={25} color={colors.solidcolor} />
        </View>
        <Modal
          visible={logoutModel}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setlogoutModel(false)}
        >
          <View style={styles.logoutcontainer}>
            <View style={[styles.makecenter, styles.logout_box]}>
              <Text style={styles.logoutheadtext}>Logout</Text>
              <Text style={styles.logout_text}>Are you sure to logout?</Text>
              <View style={[styles.makecenter, styles.logout_btn_box]}>
                <TouchableOpacity
                  style={[
                    styles.makecenter,
                    styles.logout_btn,
                    {
                      backgroundColor: 'gray'
                    }
                  ]}
                  onPress={() => setlogoutModel(false)}
                >
                  <Text style={styles.logout_btn_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.makecenter, styles.logout_btn]}
                  onPress={() => {
                    handleLogOut();
                    setlogoutModel(false);
                  }}
                >
                  <Text style={styles.logout_btn_text}>Yes, Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
      <Modal
        visible={commingSoon}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setcommingSoon(false)}
      >
        <View style={styles.logoutcontainer}>
          <View style={[styles.makecenter, styles.logout_box]}>
            <Text style={styles.logoutheadtext}>Comming Soon</Text>
            <Text style={styles.boldText}>
              This feature is coming soon! Stay tuned for updates. 🌟
            </Text>
            <View style={[styles.makecenter, styles.logout_btn_box]}>
              <TouchableOpacity
                style={[
                  styles.makecenter,
                  styles.logout_btn,
                  {
                    backgroundColor: 'gray'
                  }
                ]}
                onPress={() => setcommingSoon(false)}
              >
                <Text style={styles.logout_btn_text}>Close</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                  style={[styles.makecenter, styles.logout_btn]}
                  onPress={() => {
                    handleLogOut();
                    setlogoutModel(false);
                  }}
                >
                  <Text style={styles.logout_btn_text}>Yes, Logout</Text>
                </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MainComponent;
