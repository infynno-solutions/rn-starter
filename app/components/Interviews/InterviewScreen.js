import React, {Component} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import Animated from 'react-native-reanimated'
import {Config} from '../../common'
import {connect} from 'react-redux'
import {fetchInterviews} from './InterviewActions'
import InterviewCard from './InterviewCard'

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
        {state.isLoading === true ? (
          <ActivityIndicator size="large" />
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
                  <View style={styles.noProjects}>
                    <Text>No Interviews Assigned.</Text>
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
})

const mapStateToProps = state => {
  return {
    state: state.InterviewReducers,
  }
}

export default connect(mapStateToProps, {fetchInterviews})(InterviewScreen)
