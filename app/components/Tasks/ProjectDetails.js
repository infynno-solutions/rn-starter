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

const tasksArray = [
  {
    billable: '0',
    billable_type: 'non-billable',
    checklist: null,
    code_commenting: 0,
    code_formatting: 0,
    created_at: '2022-07-29 12:30:42',
    created_by: 2,
    deleted_at: null,
    deleted_by: 0,
    description: 'Misc Task',
    end_date: '2023-04-30',
    hours: 100,
    id: 316,
    media: null,
    naming_convention: 0,
    priority: '3',
    project: {
      client_id: 1,
      cost: 1,
      cost_type: 'rs',
      created_at: '2019-06-21 14:10:40',
      created_by: 1,
      deleted_at: null,
      deleted_by: 0,
      description: 'Any kind of R&D tasks',
      end_date: '2022-12-31',
      hours: 1,
      id: 6,
      media: null,
      name: 'Miscellaneous',
      project_id: 6,
      project_status: 'In Progress',
      rating_avg: null,
      short_name: '13206-86',
      start_date: '2019-06-01',
      status: '2',
      tasks_closed: 0,
      tasks_inprogress: 1,
      tasks_open: 0,
      technologies_name: 'PHP,MySQL,Vue.js,Angular js,Laravel,Wordpress',
      technology: '1,2,4,5,6,8',
      total_tasks: 1,
      type: '4',
      updated_at: '2019-06-21 14:10:40',
      updated_by: 2,
    },
    project_id: 6,
    short_name: '254EE-D7',
    start_date: '2022-07-01',
    status: '2',
    task_priority: 'Medium',
    task_status: 'In Progress',
    task_type: 'Front End Development',
    title: 'Misc Task 1',
    total_tracked_hours: 328.93,
    try_catch: 0,
    type: 5,
    unit_testing: 0,
    updated_at: '2022-07-29 12:30:42',
    updated_by: 0,
    user_id: 67,
  },
  {
    billable: '0',
    billable_type: 'non-billable',
    checklist: null,
    code_commenting: 0,
    code_formatting: 0,
    created_at: '2022-07-29 12:30:42',
    created_by: 2,
    deleted_at: null,
    deleted_by: 0,
    description: 'Misc Task',
    end_date: '2023-04-30',
    hours: 100,
    id: 317,
    media: null,
    naming_convention: 0,
    priority: '3',
    project: {
      client_id: 1,
      cost: 1,
      cost_type: 'rs',
      created_at: '2019-06-21 14:10:40',
      created_by: 1,
      deleted_at: null,
      deleted_by: 0,
      description: 'Any kind of R&D tasks',
      end_date: '2022-12-31',
      hours: 1,
      id: 6,
      media: null,
      name: 'Miscellaneous',
      project_id: 6,
      project_status: 'In Progress',
      rating_avg: null,
      short_name: '13206-86',
      start_date: '2019-06-01',
      status: '2',
      tasks_closed: 0,
      tasks_inprogress: 1,
      tasks_open: 0,
      technologies_name: 'PHP,MySQL,Vue.js,Angular js,Laravel,Wordpress',
      technology: '1,2,4,5,6,8',
      total_tasks: 1,
      type: '4',
      updated_at: '2019-06-21 14:10:40',
      updated_by: 2,
    },
    project_id: 6,
    short_name: '254EE-D7',
    start_date: '2022-07-01',
    status: '2',
    task_priority: 'Medium',
    task_status: 'In Progress',
    task_type: 'Front End Development',
    title: 'Misc Task 2',
    total_tracked_hours: 328.93,
    try_catch: 0,
    type: 5,
    unit_testing: 0,
    updated_at: '2022-07-29 12:30:42',
    updated_by: 0,
    user_id: 67,
  },
]
class ProjectDetails extends Component {
  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = async () => {
    const {navigation} = this.props
    const project_id = this?.props?.route?.params?.projectId
    await this.props.fetchTasks(project_id, navigation)
  }

  renderTasksView = ({item, index}) => {
    if (item === null) {
      return <View />
    }
    const project_id = this?.props?.route?.params?.projectId

    return <TaskCard task={item} key={item.id} projectId={project_id} />
  }

  render() {
    const {state} = this.props

    // console.log('state.tasks.tasks', state.tasks.tasks)

    return (
      <View style={styles.tasksContainer}>
        {state.isLoading ? (
          <View style={styles.loaderViewStyle}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {state.tasks && state.tasks.tasks.length > 0 ? (
              <View>
                {state.activeTask.project &&
                  Number(this?.props?.route.params?.projectId) !==
                    Number(state.activeTask.project) && (
                    <Text style={styles.trackTitleStyle}>
                      Task tracker already tracking in other project.
                    </Text>
                  )}
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
              </View>
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
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
  trackTitleStyle: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'red',
    paddingVertical: 6,
  },
})

const mapStateToProps = (state) => {
  return {
    state: state.TasksReducers,
  }
}

export default connect(mapStateToProps, {
  fetchTasks,
})(ProjectDetails)
