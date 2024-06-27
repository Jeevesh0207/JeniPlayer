import React, {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import createStyles from './StyleNavbar';
import {HomeSvg, LibrarySvg, ProfileSvg, SearchSvg} from '../../Svg';
import {useTheme} from '../../Theme/ThemeContext';

const Navbar = () => {
  const Navigation = useNavigation();
  const {theme} = useTheme();
  const {colors} = theme
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeColor = colors.iconactive;
  const inactiveColor = colors.iconinactive;

  const MenuList = [
    {
      title: 'Home',
      route: 'home',
      component: color => <HomeSvg color={color} size={28} />,
    },
    {
      title: 'Search',
      route: 'search',
      component: color => <SearchSvg color={color} size={30} />,
    },
    {
      title: 'Library',
      route: 'library',
      component: color => <LibrarySvg color={color} size={30} />,
    },
    {
      title: 'Profile',
      route: 'profile',
      component: color => <ProfileSvg color={color} size={30} />,
    },
  ];

  const goToPage = (index, route) => {
    setActiveIndex(index);
    Navigation.navigate(route);
  };

  return (
    <View style={[styles.container]}>
      {MenuList.map((item, index) => {
        const isActive = index === activeIndex;
        const color = isActive ? activeColor : inactiveColor;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.makecenter, styles.nav_btn]}
            onPress={() => {
              goToPage(index, item.route);
            }}>
            {item.component(color)}
            <Text style={[styles.btn_text, {color}]}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Navbar;
