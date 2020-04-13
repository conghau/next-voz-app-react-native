import * as React from 'react';
import {Image, RefreshControl, ScrollView, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {getForumFavor} from "../utils/storage";
import {themes} from "../themes";
import {covertChildForumToObject} from "../utils/helper";

class FavorForumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favor: [],
      refreshing: false,
      dataForumChildMap: {}
    }
    ;
  }


  async UNSAFE_componentWillMount() {
    const favor = await getForumFavor();
    const dataForumChildMap = covertChildForumToObject()

    this.setState({favor, dataForumChildMap});
  }

  onRefresh = async () => {
    this.setState({refreshing: true});
    const favor = await getForumFavor();
    this.setState({favor, refreshing: false});
  }

  render() {
    const {favor, dataForumChildMap = {}, refreshing} = this.state;
    return (
      <View style={{
        flex: 1,
        backgroundColor: themes.backgroundColor,
        paddingTop: 20,
      }}>

        <View
          style={{
            alignItems: "center"
          }}
        >
          <Image
            source={require('../assets/icons/64.png')}
          />

        </View>
        <ScrollView
          style={{marginTop: 20}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              style={{
                tintColor: '#fff',
                colors: ['#fff']
              }}
            />
          }
        >
          {
            favor.map((id, index) => {
                const item = dataForumChildMap[id] || {};
                return (
                  <ListItem
                    key={index}
                    chevron
                    title={item.title}
                    bottomDivider
                    // rightIcon={{name: isFavor ? 'star' : 'star-border'}}
                    onPress={() => {
                      this.props.navigation.navigate('ForumChildScreen', {
                        id: item.id,
                        title: item.title,
                        name: item.title,
                      });
                    }}

                  />
                )
              }
            )
          }
        </ScrollView>
      </View>
    );
  }
}

FavorForumScreen.navigationOptions = {
  header: null,
};

export default FavorForumScreen;
