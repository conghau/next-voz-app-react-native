import * as React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import ThreadItem from "./Item";
import {requestWithAuth} from "../../utils/request";
import Pagination from "../Pagination";
import Spinner from "react-native-loading-spinner-overlay";
import {themes} from "../../themes";
import get from "lodash/get";

class ThreadList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: false,
      fetching: false,
      threadList: [],
      xfToken: '',
      numberOfPages: 0,
      currentPage: props.page || 1,
      typing: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    await this.fetchData({currentPage: 1});
  }

  fetchData = async ({currentPage}) => {
    const forumId = get(this.props, 'route.params.id', '');

    const {currentPage: _currentPage} = this.state;

    const __currentPage = currentPage || _currentPage;

    this.setFetching(true);
    return requestWithAuth().get(`/voz/threads?forumId=${forumId}&page=${__currentPage}`)
      .then(res => res.data)
      .then(res => {
        this.setState({
          threadList: res.datas || [],
          numberOfPages: res.numberOfPages || 0,
          currentPage: __currentPage,
          error: false,
        })
      })
      .catch(() => this.setErrors(true))
      .finally(() => {
        this.setState({
          fetching: false,
          refreshing: false,
        })
      });
  }

  onRefresh = async () => {
    const {currentPage} = this.state;

    this.setRefreshing(true);
    await this.fetchData({currentPage});
  };

  setErrors = () => {
    this.setState({error: true})
  }
  setFetching = (data) => {
    this.setState({fetching: data});

  }
  setRefreshing = (data) => {
    this.setState({refreshing: data});

  }

  handleClickPage = (page) => {
    this.setState({
      fetching: true,
      currentPage: page,
    })
    this.fetchData({currentPage: page});
    if (this.scroll) {
      // this.scroll.scrollTo({y: 0, x: 0, animated: false})
      this.scroll.scrollToOffset({offset: 0, animated: false})
    }
  };

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item}) => {
    return (
      <ThreadItem
        data={item}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    const {
      numberOfPages,
      currentPage,
      fetching,
      refreshing,
      threadList,
    } = this.state;

    return (
      <View style={
        {
          flex: 1,
          backgroundColor: themes.backgroundColor,
        }
      }>
        <Spinner
          visible={fetching}
        />
        {/*<ScrollView*/}
        {/*  refreshControl={*/}
        {/*    <RefreshControl*/}
        {/*      refreshing={refreshing}*/}
        {/*      onRefresh={this.onRefresh}*/}
        {/*      style={{*/}
        {/*        tintColor: '#fff',*/}
        {/*        colors: ['#fff']*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  ref={ref => {*/}
        {/*    this.scroll = ref;*/}
        {/*  }}*/}
        {/*>*/}
          <FlatList
            keyExtractor={this.keyExtractor}
            data={threadList}
            renderItem={this.renderItem}
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
            ref={ref => {
              this.scroll = ref;
            }}
          />
          {/*{threadList.map((item, index) => {*/}
          {/*  return (*/}
          {/*    <ThreadItem*/}
          {/*      key={index}*/}
          {/*      data={item}*/}
          {/*      navigation={this.props.navigation}*/}
          {/*    />*/}
          {/*  )*/}
          {/*})}*/}
        {/*</ScrollView>*/}
        <Pagination
          totalPage={numberOfPages}
          onClick={this.handleClickPage}
          currentPage={currentPage}
          hasBottomNavigation={this.props.hasBottomNavigation}
        />
      </View>
    );
  }
}

export default ThreadList;
