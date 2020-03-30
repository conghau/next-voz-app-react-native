import * as React from 'react';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { requestWithAuth } from "../../utils/request";
import Pagination from "../Pagination";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from 'react-native-render-html';
import { Button, Divider, ListItem } from "react-native-elements";
import get from 'lodash/get';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


export default function ThreadDetail(props) {

  const [errors, setErrors] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [threadList, setThreadList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [refreshing]);

  const threadId = get(props, 'route.params.slug', `/t/luc-nay-khong-muc-bitcoin-con-doi-luc-nao.7705/`);

  // const threadId = `/t/gia-dat-nen-da-nang-lao-doc.14123/`

  async function fetchData() {
    console.log('fetchData');
    console.log(currentPage);
    setFetching(true);
    return requestWithAuth().get(`/voz/thread-detail?thread=${threadId}&page=${currentPage}`)
      .then(res => res.data)
      .then(res => {
        setThreadList(res.datas || []);
        setNumberOfPages(res.numberOfPages || 0);
        setFetching(false);
      })
      .catch((e) => {
        setErrors(true);
        console.log(e);
      })
      .finally(
        () => {
          setFetching(false);
        }
      );
  }

  useEffect(() => {
    fetchData()
  }, [currentPage]);

  // return (
  //   <FlatList
  //     keyExtractor={keyExtractor}
  //     data={datas}
  //     renderItem={renderItem}
  //   />
  // )
  //console.log(currentPage);

  return (
    <View style={
      {
        flex: 1,
        backgroundColor: '#fff',
      }
    }>
      <Spinner
        visible={fetching}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      >
        {threadList.map((item, index) => {
          const {
            content, avatar_text, avatar, userName, userTitle, userLink,
            postCount, postLink, postTime
          } = item;
          let leftAvatar = { title: avatar_text };
          if (avatar) {
            leftAvatar = { ...leftAvatar, source: { uri: avatar } }
          }

          return (
            <>
              <View key={index} style={{
                padding: 10,
              }}>
                <ListItem
                  leftAvatar={leftAvatar}
                  title={userName}
                  subtitle={userTitle}
                  subtitleStyle={{
                    fontSize: 10,
                  }}
                  bottomDivider={true}
                  style={{
                    marginBottom: 10,
                  }}
                  containerStyle={{
                    paddingLeft: 0,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                  // rightElement={
                  //   <>
                  //     <Text>#1</Text>
                  //   </>
                  // }
                  rightTitle={postCount}
                  rightTitleStyle={{ fontSize: 12 }}
                  rightSubtitle={postTime}
                  rightSubtitleStyle={{ fontSize: 10 }}

                />
                <HTML

                  html={item.content}
                  tagsStyles={{
                    // i: {
                    //   textAlign: 'center',
                    //   fontStyle: 'italic',
                    //   color: 'grey'
                    // }
                    img: {
                      maxWidth: '100%',
                      height: 'auto'
                    }
                  }}

                  classesStyles={{
                    'last-paragraph': {
                      textAlign: 'right',
                      color: 'teal',
                      fontWeight: '800'
                    },
                    'bbCodeBlock': {
                      marginTop: 5,
                      marginBottom: 10,
                      background: '#e2e3e5',
                      borderColor: '#d3d5d7',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderLeftWidth: 4,
                      borderLeftStyle: 'solid',
                      borderLeftColor: '#ff944d',
                      padding: 5,
                    },
                    'bbImage': {
                      maxWidth: '100%',
                    }
                  }}
                />
                <PostFooter/>
              </View>
              <Divider style={{ backgroundColor: '#15191d', height: 10 }}/>
            </>
          )
        })}
      </ScrollView>
      <Pagination
        totalPage={numberOfPages}
        onClick={setCurrentPage}
        currentPage={currentPage}
      />
    </View>
  );
}

ThreadDetail.navigationOptions = {
  title: 'AAA',
};


const PostFooter = () => {
  return (
    <ListItem
      topDivider={true}
      style={{ marginTop: 10 }}
      containerStyle={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 2,
        paddingTop: 5,
      }}
      leftElement={
        <Button
          title="Report"
          type="clear"
          icon={
            {
              size: 10,
              name: "announcement",
              type: 'material',
            }
          }
          titleStyle={{ fontSize: 10 }}

        />
      }
      rightElement={
        <>
          <Button
            titleStyle={{ fontSize: 10 }}
            type="clear"
            icon={
              {
                size: 10,
                name: "favorite-border",
                type: 'material',
              }
            }
            title="Ưng"
          />
          <Button
            titleStyle={{ fontSize: 10 }}
            type="clear"
            icon={
              {
                size: 10,
                name: "add",
                type: 'material',
              }
            }
            title="Quote"
          />
          <Button
            titleStyle={{ fontSize: 10 }}
            type="clear"
            icon={
              {
                size: 10,
                name: "reply",
                type: 'material',
              }
            }
            title="Reply"
          />
        </>
      }

    />
  )
}
