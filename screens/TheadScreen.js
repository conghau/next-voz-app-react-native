import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ThreadDetail from "../components/Theads/Detail";
import get from "lodash/get";
import {themes} from "../themes";

export default function ThreadDetailScreen(props) {
  const title = get(props, 'route.params.title', ``);
  const page = get(props, 'route.params.page', 1);

  props.navigation.setOptions({
      headerTitle:
          <Text
            numberOfLines={2}
          >
            {title}
          </Text>
      ,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: themes.headerTitle.backgroundColor,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
      },
      headerTitleStyle: {
        fontSize: 18,
        flexWrap: 'wrap',
        marginLeft: Platform.OS === 'ios' ? 50: 0,
        maxWidth: '80%'
      },

    }
  );

  return (
    <View style={styles.container}>
      <ThreadDetail {...props} title={title} page={page}/>
    </View>
  );
}

ThreadDetailScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
