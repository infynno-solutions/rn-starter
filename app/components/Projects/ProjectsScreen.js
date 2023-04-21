import React, {useCallback, useEffect} from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import {fetchProjects} from './ProjectsActions'
import {getCurrentScreen} from '../Auth/AuthActions'
import {Config} from '../../common'
import {useFocusEffect} from '@react-navigation/core'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

const ProjectsScreen = (props) => {
  const dispatch = useDispatch()
  const {isLoading, projects} = useSelector((state) => state.ProjectsReducers)

  const fetchProjectsFunction = useCallback(async () => {
    const {navigation} = props
    dispatch(fetchProjects(navigation))
  }, [dispatch, props])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentScreen('Projects'))
      return () => {}
    }, [dispatch])
  )

  useEffect(() => {
    fetchProjectsFunction()
  }, [fetchProjectsFunction])

  const renderProjectView = ({item, index}) => {
    const {navigation} = props
    if (item === null) {
      return <View />
    }

    return <ProjectCard navigation={navigation} project={item} key={item.id} />
  }

  return (
    <View style={styles.projects} testID={'projectscreen'}>
      {isLoading === true ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          {projects && (
            <AnimatedListView
              data={projects.projects}
              keyExtractor={(item, index) => `project-${item.id} || ${index}`}
              renderItem={renderProjectView}
              refreshing={isLoading}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => fetchProjects(props?.navigation)}
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

export default ProjectsScreen

const styles = StyleSheet.create({
  projects: {
    backgroundColor: Config.backgroundColor,
    flex: 1,
  },
  noProjects: {
    margin: 20,
  },
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
})
