import * as React from 'react';
import {Alert, AsyncStorage, Image, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {loginAction} from "../services";
import get from 'lodash/get';
import {
  clearDataAfterLogout,
  getUserAuth,
  saveUserAuth
} from "../utils/storage";
import {themes} from "../themes";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertLoginFail: false,
      userName: '',
      password: '',
      loginSuccess: false,
      userAuth: {},
    };
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

  async UNSAFE_componentWillMount() {
    const userAuth = await this.retrieveData();
    this.setState({userAuth})
  }

  storeData = async (value = {}) => {
    try {
      await saveUserAuth(value)
      // await AsyncStorage.setItem('@nextvoz:cookie', JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  };

  retrieveData = async () => {
    return await getUserAuth();
  };

  handleLogout = async () => {
    await clearDataAfterLogout();
    this.props.navigation.navigate('Forums');
  }

  handleLogin = () => {
    const {userName, password} = this.state;

    loginAction({
      username: userName, //'ienjoymylife',
      password: password, //'Aesx5099'
    }).then(async (resp) => {
      const {data} = resp;
      if (get(data, 'success')) {
        await AsyncStorage.clear();
        this.setState({loginSuccess: true});
        await this.storeData({
          userName,
          cookies: get(data, 'data.cookie', []),
        });
        this.props.navigation.navigate('Forums');
      } else {
        this.setState({
          loginSuccess: false,
          showAlertLoginFail: true,
        })
      }
    })
      .catch(() => {
        this.setState({showAlertLoginFail: true,})
      })
      .finally(() => {

      })
  };

  renderAlert = () => {
    const {showAlertLoginFail} = this.state;
    if (showAlertLoginFail) {
      return Alert.alert(
        'Alert',
        'Login fail',
        [
          {
            text: 'OK', onPress: () => {
              this.setState({showAlertLoginFail: false})
            }
          },
        ],
      )
    }
    return null;
  }

  render() {
    const {userName, password, userAuth} = this.state;
    console.log({userAuth});
    return (
      <View style={{
        flex: 1,
        backgroundColor: themes.backgroundColor,
        paddingTop: 20,
      }}>
        {
          this.renderAlert()
        }

        <View
          style={{
            alignItems: "center"
          }}
        >
          <Image
            source={require('../assets/icons/64.png')}
          />

        </View>
        {userAuth.userName ?
          <View
            style={
              {
                padding: 40,
                alignItems: "center"
              }
            }
          >
            <Text
              style={{color: '#fff', fontSize: 20, marginBottom: 20}}
            >
              Hello: {userAuth.userName}</Text>

            <Button
              title="Logout"
              onPress={this.handleLogout}
              buttonStyle={{
                width: 100
              }}
            />
          </View>
          :
          <View
            style={
              {
                padding: 40
              }
            }
          >
            <Input
              placeholder='Username'
              placeholderTextColor={'#fff'}
              inputStyle={{color: '#fff'}}
              value={userName}
              onChangeText={text => this.setState({userName: text})}
            />

            <Input
              placeholder='Password'
              placeholderTextColor={'#fff'}
              inputStyle={{color: '#fff'}}
              value={password}
              secureTextEntry={true}
              type={'password'}
              visible-password
              onChangeText={text => this.setState({password: text})}
              containerStyle={
                {
                  marginBottom: 20
                }
              }
            />

            <Button
              title="Login"
              onPress={this.handleLogin}
            />
          </View>
        }
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;
