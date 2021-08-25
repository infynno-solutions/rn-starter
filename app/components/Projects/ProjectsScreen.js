import React, {Component} from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Animated,
  RefreshControl,
} from 'react-native'
import ProjectCard from './ProjectCard'
import {connect} from 'react-redux'
import {fetchProjects} from './ProjectsActions'
import {Config} from '../../common'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)
class ProjectsScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = async () => {
    const {navigation} = this.props

    await this.props.fetchProjects(navigation)
  }

  renderProjectView = ({item, index}) => {
    const {navigation} = this.props
    if (item === null) {
      return <View />
    }

    return <ProjectCard navigation={navigation} project={item} key={item.id} />
  }

  render() {
    const {state, navigation} = this.props

    return (
      <View style={styles.projects} testID={'projectscreen'}>
        {state.isLoading === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {state.projects && (
              <AnimatedListView
                data={state.projects.projects}
                keyExtractor={(item, index) => `project-${item.id} || ${index}`}
                renderItem={this.renderProjectView}
                refreshing={state.isLoading}
                refreshControl={
                  <RefreshControl
                    refreshing={state.isLoading}
                    onRefresh={() => this.fetchProjects(navigation)}
                  />
                }
                ListEmptyComponent={
                  <View style={styles.noProjects}>
                    <Text>No Projects Assigned.</Text>
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
  projects: {
    backgroundColor: Config.backgroundColor,
    flex: 1,
  },
  noProjects: {
    margin: 20,
  },
})

const mapStateToProps = state => {
  return {
    state: state.ProjectsReducers,
  }
}
export default connect(mapStateToProps, {fetchProjects})(ProjectsScreen)
