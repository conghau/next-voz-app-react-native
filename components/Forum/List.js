import React from 'react';
import {View} from 'react-native';
import {ScrollView} from "react-native-gesture-handler";
import {Button, ListItem, Text} from "react-native-elements";
import {dataForum} from "../../constants/data";
import {getForumFavor, saveForumFavor} from "../../utils/storage";

class ForumList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favor: []
    }
  }

  async UNSAFE_componentWillMount() {
    const favor = await getForumFavor()
    console.log(favor);
    this.setState({favor})
  }

  saveToLocal = async (id, isAdd) => {
    const {favor} = this.state;
    let data = [];
    if (isAdd) {
      data = [...favor, id];
    } else {
      data = favor.filter((item) => item != id);
    }
    await saveForumFavor(data)
    this.setState({
      favor: data,
    });
  }

  render() {
    const {favor} = this.state;
    return (
      <ScrollView>
        {dataForum.map((group, index) => {
          return (
            <GroupList
              {...this.props}
              data={group}
              key={index}
              favors={favor || []}
              saveToLocal={this.saveToLocal}
            />
          )
        })}
      </ScrollView>
    );
  }
}


const GroupList = ({data, navigation, favors = [], saveToLocal, ...rest}) => {
  const {title, id, child = []} = data || {};

  return (
    <View>
      <Text h4 h4Style={{
        backgroundColor: 'rgba(4,2,1,0.75)',
        padding: 5,
        paddingLeft: 10,
        fontSize: 20,
        color: '#ffffff'
      }}>{title}</Text>
      <View>
        {
          child.map((item, index) => {
            const isFavor = Array.isArray(favors) && favors.indexOf(item.id) > -1;
            return (
              <ListItem
                key={index}
                title={item.title}
                // subtitle={'8 viewing'}
                bottomDivider
                rightElement={
                  <View>
                    <Button
                      type="clear"
                      icon={
                        {
                          name: isFavor ? 'star' : 'star-border',
                        }
                      }
                      titleStyle={{
                        fontSize: 10,
                      }}
                      onPress={() => {
                        saveToLocal(item.id, !isFavor)
                      }}
                    />
                  </View>
                }
                // rightIcon={{name: isFavor ? 'star' : 'star-border'}}
                onPress={() => {
                  navigation.navigate('ForumChildScreen', {
                    id: item.id,
                    title: item.title,
                    name: item.title,
                  });
                }}

              />
            )
          })
        }
      </View>
    </View>
  )
};

export default ForumList;

ForumList.navigationOptions = {
  header: null,
};
