import {AsyncStorage,} from "react-native";
import isEmpty from "lodash/isEmpty";

export const getCookies = async () => {
  try {
    const data = await getUserAuth();
    return data.cookies || []
  } catch (error) {
    return [];
  }
};

export const getCookiesStr = async () => {
  const value = await getCookies();
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

export const getUserAuth = async (defaultValue = {}) => {
  try {
    const value = await AsyncStorage.getItem('@nextvoz:userinfo');
    return toJson(value, defaultValue);
  } catch (error) {
    return defaultValue;
  }
};

export const saveUserAuth = async (data = {}) => {
  try {
    console.log('saveUserAuth');
    console.log(data);
    await AsyncStorage.setItem('@nextvoz:userinfo', JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};


export const getForumFavor = async (defaultValue = []) => {
  try {
    const value = await AsyncStorage.getItem('@nextvoz:forumfavor');
    return toJson(value, defaultValue);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * saveForumFavor
 * @param dataForumIdFavor , like that [33,17,]
 * @returns {Promise<boolean>}
 */
export const saveForumFavor = async (dataForumIdFavor = []) => {

  try {
    await AsyncStorage.setItem('@nextvoz:forumfavor', JSON.stringify(dataForumIdFavor));
    return true;
  } catch (error) {
    return false;
  }
};

export const clearDataAfterLogout = async () => {
  try {
    await AsyncStorage.removeItem('@nextvoz:userinfo');
    await AsyncStorage.removeItem('@nextvoz:cookie');
    return true;
  } catch (error) {
    return false;
  }
}
