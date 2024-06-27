import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../Theme/ThemeContext';

const MainComponent = () => {
  const { theme, toggleTheme, toggleType, type } = useTheme();
  const { colors } = theme;
  const [selectedTheme, setSelectedTheme] = useState(type);

  const themeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Ocean Wave', value: 'oceanwave' },
    { label: 'Forest Whisper', value: 'forestwhisper' },
    { label: 'Rose Garden', value: 'rosegarden' },
    { label: 'Winter Frost', value: 'winterfrost' },
];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
      <Text style={{ color: colors.text }}>Profile</Text>
      <Picker
        selectedValue={selectedTheme}
        onValueChange={(itemValue) => {
          setSelectedTheme(itemValue);
          toggleType(itemValue)
        }}
        style={{ height: 50, width: 150, marginTop: 20 ,backgroundColor:colors.solidcolor,color:colors.text_C2}}
        
      >
        {themeOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
      <View style={{ padding: 20 }}>
        <Button onPress={() => toggleTheme()} title={!theme.mode ? 'Set To Dark Mode' : 'Set To Light Mode'} />
      </View>

    </View>
  );
};

export default MainComponent;
