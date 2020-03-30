import * as React from 'react';
import { ListItem } from "react-native-elements";
import {Text, View} from "react-native";

export default function ThreadItem({ data, navigation }) {
  const {isSticky, view, reply, username} = data;
  return (
    <ListItem
      title={data.name}
      titleStyle={{marginBottom: 4}}
      subtitle={`${username} - ${view} Views - ${reply} Replies`}
      subtitleStyle={{fontSize: 12, color: 'rgba(78,78,78,0.73)'}}
      bottomDivider
      rightIcon={isSticky ? { name: 'golf-course', containerStyle: {color: 'red'} } : {}}
      onPress={() => {
        navigation.navigate('ThreadDetailScreen', {
          id: data.link,
          slug: data.link,
          title: data.name
        });
      }}
    >

    </ListItem>
  );
}

ThreadItem.navigationOptions = {
  header: null,
};
