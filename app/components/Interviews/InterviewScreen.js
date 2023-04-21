import React, {Component} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native'
import Animated from 'react-native-reanimated'
import {Config} from '../../common'
import {connect} from 'react-redux'
import {fetchInterviews} from './InterviewActions'
import InterviewCard from './InterviewCard'
import CustomHeader from '../CustomHeader'
import Images from '../../../assets/images'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

class InterviewScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  componentDidMount() {
    this.fetchInterviews()
  }

  fetchInterviews = async () => {
    const {navigation} = this.props
    await this.props.fetchInterviews(navigation)
  }

  renderInterviewView = ({item, index}) => {
    const {navigation} = this.props
    if (item === null) {
      return <View />
    }

    return (
      <InterviewCard navigation={navigation} interview={item} key={item.id} />
    )
  }

  render() {
    const {state, navigation} = this.props

    return (
      <View style={styles.interviews} testID={'projectscreen'}>
        <CustomHeader name="Interviews" navigation={navigation} />
        {state.isLoading === true ? (
          <View style={styles.loaderViewStyle}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {state.interviews && (
              <AnimatedListView
                data={state.interviews.interviews}
                keyExtractor={(item, index) => `project-${item.id} || ${index}`}
                renderItem={this.renderInterviewView}
                refreshing={state.isLoading}
                refreshControl={
                  <RefreshControl
                    refreshing={state.isLoading}
                    onRefresh={() => this.fetchInterviews(navigation)}
                  />
                }
                ListEmptyComponent={
                  <View style={styles.noInterview}>
                    <Image
                      source={Images.noDataFound}
                      style={styles.noDataFound}
                    />
                    <Text style={styles.noInterViewText}>
                      No Interviews Assigned.
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  interviews: {
    backgroundColor: Config.backgroundColor,
    flex: 1,
  },
  noInterviews: {
    margin: 20,
  },
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
  noInterview: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInterViewText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noDataFound: {
    height: 50,
    width: 50,
  },
})

const mapStateToProps = (state) => {
  return {
    state: state.InterviewReducers,
  }
}

export default connect(mapStateToProps, {fetchInterviews})(InterviewScreen)
