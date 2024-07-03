import React, { memo, useMemo, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { createStyles } from './StyleHome';
import { Carousel, HorizontalList, TopNav } from './Section';
import { useTheme } from '../../Theme/ThemeContext';

const Home = () => {
  const { data } = useSelector((state) => state.getLaunchData);

  const { isDisplay } = useSelector((state) => state.getTrackPlayerData);

  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);


  return (
    <GestureHandlerRootView
      style={{
        flex: 1
      }}
    >
      <TopNav />
      <ScrollView
        style={[styles.container]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isDisplay ? 60 : 0
        }}
      >
        <Carousel />
        <HorizontalList data={data} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default memo(Home);
