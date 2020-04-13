import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ForumList from "../components/Forum/List";

export default function Forums({navigation}) {
  return (
    <View style={styles.container}>
      <ForumList navigation={navigation}/>
    </View>
  );
}

Forums.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
