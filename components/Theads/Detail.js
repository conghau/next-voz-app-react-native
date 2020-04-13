import * as React from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';
import Pagination from "../Pagination";
import Spinner from "react-native-loading-spinner-overlay";
import HTML from 'react-native-render-html';
import {Button, Divider, ListItem} from "react-native-elements";
import get from 'lodash/get';
import ReplyForm from "../ReplyForm";
import {getTheadDetail, getTheadDetailXfToken, postReply} from "../../services";
import {themes} from "../../themes";
import {getUserAuth} from "../../utils/storage";

class ThreadDetail extends React.Component {
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
    const threadId = get(this.props, 'route.params.slug', '');

    await this.fetchData({currentPage: 1});

    const userAuth = await getUserAuth();
    if (userAuth.userName) {
      getTheadDetailXfToken({threadId})
        .then(res => res.data)
        .then(res => {
          this.setState({
            xfToken: res.xfToken || '',
            clientCookie: res.clientCookie || '',
          })
        })
        .catch((e) => {
        })
        .finally(
          () => {
          }
        );
    }
  }

  setErrors = () => {
    this.setState({error: true})
  }
  setFetching = (data) => {
    this.setState({fetching: data});

  }
  setThreadList = (data) => {
    this.setState({threadList: data})
  }
  setCurrentPage = (page) => {
    this.setState({currentPage: page});
  }
  setTyping = (data) => {
    this.setState({typing: data});

  }
  setRefreshing = (data) => {
    this.setState({refreshing: data});

  }
  setNumberOfPages = (data) => {
    this.setState({numberOfPages: data});

  }

  handleClickPage = (page) => {
    this.setCurrentPage(page);
    this.fetchData({currentPage: page});
    if (this.scroll) {
      this.scroll.scrollTo({y: 0, x: 0, animated: false})
    }
  };

  onRefresh = async () => {
    const {currentPage} = this.state;

    this.setRefreshing(true);
    await this.fetchData({currentPage});
  };

  sendReply = (data) => {
    const {xfToken, clientCookie, currentPage, numberOfPages} = this.state;
    const threadId = get(this.props, 'route.params.slug', '');
    return postReply(Object.assign({}, data, {
      requestUri: threadId,
      threadSlug: threadId,
      token: xfToken,
      customCookie: clientCookie,
    }))
      .then(res => res.data)
      .then(async res => {
        console.log(res);
        console.log(currentPage);
        if (res.success && currentPage >= numberOfPages) {
          await this.fetchData({});
        } else {
          this.setTyping(false);

        }
        // this.setFetching(false);
        // this.setTyping(false);
      })
      .catch((e) => {
        this.setErrors(true);
        console.log(e);
      })
    // .finally(
    //   () => {
    //     this.setFetching(false);
    //   }
    // );
  };

  fetchData = ({currentPage}) => {
    const threadId = get(this.props, 'route.params.slug', '');
    console.log(threadId);
    const {currentPage: _currentPage} = this.state;

    this.setFetching(true);
    getTheadDetail({threadId, currentPage: currentPage || _currentPage})
      .then(res => res.data)
      .then(res => {
        this.setState({
          threadList: res.datas || [],
          numberOfPages: res.numberOfPages || 0,
          error: false,
        })
      })
      .catch((e) => {
        this.setErrors(true);
        console.log(e);
      })
      .finally(
        () => {
          this.setState({
            fetching: false,
            typing: false,
            refreshing: false,
          })
        }
      );

  };

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item}) => {
    const {
      content, avatar_text, avatar, userName, userTitle, userLink,
      postCount, postLink, postTime
    } = item;
    let leftAvatar = {title: avatar_text};
    if (avatar) {
      leftAvatar = {...leftAvatar, source: {uri: avatar}}
    }


    return (
      <>
        <View
          style={{
            padding: 10,
            backgroundColor: '#15191d'

          }}>
          <ListItem
            leftAvatar={leftAvatar}
            title={userName}
            titleStyle={{
              color: '#f87439'
            }}
            subtitle={userTitle}

            subtitleStyle={{
              fontSize: 10,
              color: '#f87439'
            }}
            bottomDivider={true}
            style={{
              marginBottom: 10,
              backgroundColor: '#15191d'

            }}
            containerStyle={{
              paddingLeft: 0,
              paddingBottom: 10,
              paddingTop: 10,
              backgroundColor: '#15191d'
            }}
            rightTitle={postCount}
            rightTitleStyle={{fontSize: 12, color: '#f87439'}}
            rightSubtitle={postTime}
            rightSubtitleStyle={{fontSize: 10, color: '#f87439'}}

          />
          {/*{Dimensions.get('window').width}*/}
          <HTML
            html={content}
            onLinkPress={(evt, href) => {
              Linking.openURL(href);
            }}
            baseFontStyle={{fontSize: 18}}
            containerStyle={{color: '#fff'}}
            tagsStyles={{
              // i: {
              //   textAlign: 'center',
              //   fontStyle: 'italic',
              //   color: 'grey'
              // }
              img: {
                maxWidth: '100%',
                height: 'auto'
              },
              p: {
                color: '#fff'
              },
              span: {
                color: '#fff'
              },
              div: {
                color: '#fff'
              },
              iframe: {
                maxWidth: '98%'
              }
            }}
            staticContentMaxWidth={100}
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
                color: '#fff'
              },
              'bbImage': {
                maxWidth: '100%',
              },
              'bbMediaWrapper-inner iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              },
              'bbMediaWrapper': {
                width: 'auto',
                maxWidth: '100%',
              },
              // 'bbMediaJustifier': {
              //   maxWidth: '100%',
              // },
              // 'bbMediaWrapper-inner': {
              //   position: 'relative',
              //   paddingBottom: '56.25%',
              //   height: 0,
              // }
            }}
          />
          <PostFooter/>
        </View>
        <Divider style={{
          backgroundColor: 'rgba(76,76,76,0.33)',
          height: 5
        }}/>
      </>
    )
  }

  render() {
    const {
      numberOfPages,
      currentPage,
      typing,
      fetching,
      refreshing,
      threadList,
      xfToken,
      error
    } = this.state;
    const title = get(this.props, 'title');
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
        {
          error &&
          <View>
            <Text>ERR</Text>
          </View>
        }
        {
          !error &&
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            // behavior="padding"
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={100}
          >

            <ScrollView
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
            >
              <View
                key={'view-title'}
                style={{
                  backgroundColor: themes.threadHeader.backgroundColor
                }}
              >
                <Text style={{
                  fontSize: 16,
                  paddingTop: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 10,
                  color: themes.threadHeader.color,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>{title}</Text>
                <Divider style={{backgroundColor: '#15191d', height: 1}}/>

              </View>
              {threadList.map((item, index) => {
                const {
                  content, avatar_text, avatar, userName, userTitle, userLink,
                  postCount, postLink, postTime
                } = item;
                let leftAvatar = {title: avatar_text};
                if (avatar) {
                  leftAvatar = {...leftAvatar, source: {uri: avatar}}
                }


                return (
                  <>
                    <View
                      key={index}
                      style={{
                        padding: 10,
                        backgroundColor: '#15191d'

                      }}>
                      <ListItem
                        leftAvatar={leftAvatar}
                        title={userName}
                        titleStyle={{
                          color: '#f87439'
                        }}
                        subtitle={userTitle}

                        subtitleStyle={{
                          fontSize: 10,
                          color: '#f87439'
                        }}
                        bottomDivider={true}
                        style={{
                          marginBottom: 10,
                          backgroundColor: '#15191d'

                        }}
                        containerStyle={{
                          paddingLeft: 0,
                          paddingBottom: 10,
                          paddingTop: 10,
                          backgroundColor: '#15191d'
                        }}
                        rightTitle={postCount}
                        rightTitleStyle={{fontSize: 12, color: '#f87439'}}
                        rightSubtitle={postTime}
                        rightSubtitleStyle={{fontSize: 10, color: '#f87439'}}

                      />
                      <HTML
                        html={content}
                        baseFontStyle={{fontSize: 18}}
                        containerStyle={{color: '#fff'}}
                        tagsStyles={{
                          // i: {
                          //   textAlign: 'center',
                          //   fontStyle: 'italic',
                          //   color: 'grey'
                          // }
                          img: {
                            maxWidth: '100%',
                            height: 'auto'
                          },
                          p: {
                            color: '#fff'
                          },
                          span: {
                            color: '#fff'
                          },
                          div: {
                            color: '#fff'
                          },
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
                            color: '#fff'
                          },
                          'bbImage': {
                            maxWidth: '100%',
                          }
                        }}
                      />
                      <PostFooter/>
                    </View>
                    <Divider style={{
                      backgroundColor: 'rgba(76,76,76,0.33)',
                      height: 5
                    }}/>
                  </>
                )
              })}
            </ScrollView>
            {
              typing ?
                <ReplyForm

                  onClose={() => this.setTyping(false)}
                  onSend={this.sendReply}
                /> :
                <Pagination
                  totalPage={numberOfPages}
                  onClick={this.handleClickPage}
                  currentPage={currentPage}
                  onClickReply={this.setTyping}
                  isAuthen={!!xfToken}
                />
            }

          </KeyboardAvoidingView>
        }
      </View>
    );
  }
}


ThreadDetail.navigationOptions = {
  title: 'AAA',
};

export default ThreadDetail;


const PostFooter = () => {
  return (
    <ListItem
      topDivider={true}
      style={{marginTop: 10}}
      containerStyle={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 2,
        paddingTop: 5,
        backgroundColor: '#15191d'

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
              color: themes.theadFooter.icon.color
            }
          }
          titleStyle={{
            fontSize: 10,
            color: themes.theadFooter.icon.color
          }}

        />
      }
      rightElement={
        <>
          <Button
            titleStyle={{fontSize: 10, color: themes.theadFooter.icon.color}}
            type="clear"
            icon={
              {
                size: 10,
                name: "favorite-border",
                type: 'material',
                color: themes.theadFooter.icon.color
              }
            }
            title="Ưng"
          />
          <Button
            titleStyle={{fontSize: 10, color: themes.theadFooter.icon.color}}
            type="clear"
            icon={
              {
                size: 10,
                name: "add",
                type: 'material',
                color: themes.theadFooter.icon.color
              }
            }
            title="Quote"
          />
          <Button
            titleStyle={{fontSize: 10, color: themes.theadFooter.icon.color}}
            type="clear"
            icon={
              {
                size: 10,
                name: "reply",
                type: 'material',
                color: themes.theadFooter.icon.color
              }
            }
            title="Reply"
          />
        </>
      }
    />
  )
};

