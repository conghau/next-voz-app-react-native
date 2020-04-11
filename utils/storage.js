import { AsyncStorage, } from "react-native";
import isEmpty from "lodash/isEmpty";

export const getCookies = async () => {
  try {
    const value = await AsyncStorage.getItem('@nextvoz:cookie');
    return toJson(value, []);
  } catch (error) {
    return [];
  }
};

export const getCookiesStr = async () => {
  const value = await getCookies();
  console.log(value);

  return value.join(';');
};

export const toJson = (str, defaultValue = {}) => {
  if (isEmpty(str)) {
    return defaultValue
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
};
