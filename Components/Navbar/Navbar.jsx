import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import createStyles from './StyleNavbar';
import { HomeSvg, LibrarySvg, ProfileSvg, SearchSvg } from '../../Svg';
import { useTheme } from '../../Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNav } from '../../redux/actions';


const Navbar = () => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const currentRouteName = useNavigationState((state) => state?.routes[state?.index]?.name);

  const { isUserLogin } = useSelector((state) => state.getUserData);
  const activeColor = colors.iconactive;
  const inactiveColor = colors.iconinactive;



  const MenuList = [
    {
      title: 'Home',
      route: 'home',
      component: (color) => <HomeSvg color={color} size={28} />
    },
    {
      title: 'Search',
      route: 'search',
      component: (color) => <SearchSvg color={color} size={30} />
    },
    {
      title: 'Library',
      route: 'library',
      component: (color) => <LibrarySvg color={color} size={30} />
    },
    {
      title: 'Profile',
      route: 'profile',
      component: (color) => <ProfileSvg color={color} size={30} />
    }
  ];

  const goToPage = (route) => {
    if((route==='profile' || route==='library') && !isUserLogin){
      Navigation.navigate('authpage');
    }else{
      Navigation.navigate(route);
    }
    
  };

  return (
    <View style={[styles.container]}>
      {MenuList.map((item, index) => {
        const isActive = currentRouteName === item.route;
        const color = isActive ? activeColor : inactiveColor;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.makecenter, styles.nav_btn]}
            onPress={() => {
              goToPage(item.route);
            }}
          >
            {item.component(color)}
            <Text style={[styles.btn_text, { color }]}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Navbar;
