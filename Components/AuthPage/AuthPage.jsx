import React, { useState, useMemo } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import { createStyles } from './StyleAuthPage';
import { useNavigation } from '@react-navigation/native';
import { Image, Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../constants';

const AuthPage = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.bannerContainer}>
      <Image
        style={styles.banner}
        source={require('../../img/Auth/banner.jpg')}
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
        <Text
          style={[
            styles.title,
            {
              marginBottom: 25
            }
          ]}
        >
          Welcome to
        </Text>
        <Text
          style={[
            styles.title,
            {
              fontSize: 45,
              color: '#fff',
              fontFamily: fonts.magic
            }
          ]}
        >
          Jeni Player
        </Text>
        <View style={styles.posterbox}>
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
            source={require('../../img/Auth/authposter.jpg')}
            contentPosition={'top center'}
            alt="poster"
            transition={true}
            onError={(error) => console.log('Image failed to load', error)}
          />
        </View>
        <Text style={styles.subtitle}>
          Your gateway to an unparalleled music experience. Sign In or Sign Up
          to explore a world of melodies, rhythms, and harmonies curated just
          for you.
        </Text>

        <TouchableOpacity
          style={[styles.makecenter, styles.button]}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.makecenter,
            styles.button,
            {
              backgroundColor: 'gray'
            }
          ]}
          onPress={() => navigation.navigate('signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthPage;
