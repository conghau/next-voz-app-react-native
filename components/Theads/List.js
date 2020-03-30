import * as React from 'react';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import ThreadItem from "./Item";
import { requestWithAuth } from "../../utils/request";
import Pagination from "../Pagination";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from '@react-navigation/native';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


export default function ThreadList(props) {

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

  const navigation = useNavigation();


  const forumId = props.route.params.id;

  async function fetchData() {
    console.log('fetchData');
    setFetching(true);
    return requestWithAuth().get(`/voz/threads?forumId=${forumId}&page=${currentPage}`)
      .then(res => res.data)
      .then(res => {
        setThreadList(res.datas || []);
        setNumberOfPages(res.numberOfPages || 0);
      })
      .catch(() => setErrors(true))
      .finally(() => {
        setFetching(false);
      });
  }

  useEffect(() => {
    fetchData()
  }, [currentPage]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ThreadItem
      // key={index}
      data={item}
    />
  );

  // return (
  //   <FlatList
  //     keyExtractor={keyExtractor}
  //     data={datas}
  //     renderItem={renderItem}
  //   />
  // )

  const {hasBottomNavigation} = props;

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
          return (
            <ThreadItem
              key={index}
              data={item}
              navigation={navigation}
            />
          )
        })}
      </ScrollView>
      <Pagination
        totalPage={numberOfPages}
        onClick={setCurrentPage}
        currentPage={currentPage}
        hasBottomNavigation={hasBottomNavigation}
      />
    </View>
  );
}

ThreadList.navigationOptions = {
  header: null,
};
