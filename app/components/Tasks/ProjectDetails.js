import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native'
import TaskCard from './TaskCard'
import {connect} from 'react-redux'
import {fetchTasks} from './TasksActions'
import {Config} from '../../common'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)
class ProjectDetails extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.projectName,
  })

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = async () => {
    const {navigation} = this.props
    const project_id = navigation.state.params.projectId
    await this.props.fetchTasks(project_id, navigation)
  }

  renderTasksView = ({item, index}) => {
    if (item === null) {
      return <View />
    }
    const project_id = this.props.navigation.state.params.projectId

    return <TaskCard task={item} key={item.id} projectId={project_id} />
  }

  render() {
    const {state} = this.props

    return (
      <View style={styles.tasksContainer}>
        {state.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {state.tasks && state.tasks.tasks.length > 0 ? (
              <AnimatedListView
                data={state.tasks.tasks}
                keyExtractor={(item, index) => `task-${item.id} || ${index}`}
                renderItem={this.renderTasksView}
                refreshing={state.isLoading}
                refreshControl={
                  <RefreshControl
                    refreshing={state.isLoading}
                    onRefresh={() => this.fetchTasks()}
                  />
                }
              />
            ) : (
              <View style={styles.noTasks}>
                <Text>No Tasks Assigned.</Text>
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  noTasks: {
    margin: 20,
  },
})

const mapStateToProps = state => {
  return {
    state: state.TasksReducers,
  }
}

export default connect(mapStateToProps, {
  fetchTasks,
})(ProjectDetails)
