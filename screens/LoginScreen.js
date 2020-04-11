import * as React from 'react';
import { AsyncStorage, Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginAction } from "../services";
import get from 'lodash/get';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // const title = get(props, 'route.params.title', ``);
  //
  // props.navigation.setOptions({
  //     headerTitle:
  //       <Text
  //         numberOfLines={2}
  //       >
  //         {title}
  //       </Text>
  //     ,
  //     headerTintColor: '#ffffff',
  //     headerStyle: {
  //       backgroundColor: '#2F95D6',
  //       borderBottomColor: '#ffffff',
  //       borderBottomWidth: 3,
  //     },
  //     headerTitleStyle: {
  //       fontSize: 18,
  //       flexWrap: 'wrap',
  //       marginLeft: Platform.OS === 'ios' ? 50 : 0,
  //       maxWidth: '80%'
  //     },
  //
  //   }
  // );

  async componentDidMount() {
    const value = await this._retrieveData();
    this.setState({ value })
  }

  _storeData = async (value = []) => {
    try {
      await AsyncStorage.setItem('@nextvoz:cookie', JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem('@nextvoz:cookie');
    } catch (error) {
      // Error retrieving data
    }
    return value;
  };

  handleLogin = () => {
    loginAction({
      username: 'ienjoymylife',
      password: 'Aesx5099'
    }).then(async (resp) => {
      const { data } = resp;
      await AsyncStorage.clear();

      this._storeData(get(data, 'data.cookie', []));
    })
      .catch(() => {

      })
      .finally(() => {

      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.value}</Text>
        <Input
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />

        <Input
          placeholder='Password'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />

        <Button
          title="Login Button"
          onPress={this.handleLogin}
        />
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;

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
