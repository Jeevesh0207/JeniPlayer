import React from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { useColors } from '../../constants';
import { useTheme } from '../../Theme/ThemeContext';
const MainComponent = () => {
  const colors = useColors()
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ color: colors.text }}>Profile</Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.background, padding: 10, marginTop: 20 }}
      >
        <Text style={{ color: colors.text }}>
          {!theme.mode ? 'Set To Dark Mode' : 'Set To Light Mode'}
        </Text>

      </TouchableOpacity>
      <View style={{ padding: 20 }}>
        <Button onPress={toggleTheme} title="Toggle Theme" />
      </View>
    </View>
  );
};

export default MainComponent;
