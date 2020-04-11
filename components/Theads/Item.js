import * as React from 'react';
import {ListItem} from "react-native-elements";
import {themes} from "../../themes";

export default function ThreadItem({data, navigation}) {
  const {isSticky, view, reply, username} = data;
  return (
    <ListItem
      style={{
        // marginBottom: 10,
        // backgroundColor: '#15191d'

      }}
      containerStyle={{
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: themes.threadList.backgroundColor
      }}
      title={data.name}
      titleStyle={{
        color: themes.threadList.titleColor,
        marginBottom: 4
      }}
      subtitle={`${username} - ${view} Views - ${reply} Replies`}
      subtitleStyle={{
        fontSize: 12,
        color: themes.threadList.subtitleColor,
      }}
      bottomDivider
      rightIcon={isSticky ? {
        name: 'golf-course',
        color: themes.threadList.stickIconColor,
      } : {
        name: 'navigate-next',
        color: themes.threadList.iconColor,

      }}
      onPress={() => {
        navigation.navigate('ThreadDetailScreen', {
          id: data.link,
          slug: data.link,
          title: data.name
        });
      }}
    />
  );
}

ThreadItem.navigationOptions = {
  header: null,
};
