import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import ThreadList from "../components/Theads/List";

export default function ForumChildScreen(props) {
  return (
    <View style={styles.container}>
      <ThreadList {...props}/>
    </View>
  );
}

ForumChildScreen.navigationOptions = {
  header: 'AAA',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
