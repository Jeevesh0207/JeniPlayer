import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }
  };

export const CheckUserAuth = async(navigation) =>{
    const user = await getData('cookies');
    if(user){
      return true;
    }
    navigation.navigate('authpage')
}