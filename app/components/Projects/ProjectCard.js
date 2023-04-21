import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Config} from '../../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import {useSelector} from 'react-redux'

const ProjectCard = ({navigation, project}) => {
  const {activeTask} = useSelector((state) => state.TasksReducers)

  let statusStyle
  if (project.project_status === 'Completed') {
    statusStyle = styles.completed
  } else if (project.project_status === 'In Progress') {
    statusStyle = styles.inprogress
  } else if (project.project_status === 'On Hold') {
    statusStyle = styles.hold
  } else {
    statusStyle = styles.other
  }

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('ProjectDetails', {
          projectId: project.project_id,
          projectName: project.name,
        })
      }>
      <View style={styles.statusWapper}>
        <Text style={statusStyle}>In Progress</Text>
        <Text style={styles.date}>
          {project.start_date && moment(project.start_date).format('DD MMM')} -{' '}
          {project.end_date && moment(project.end_date).format('DD MMM')}
        </Text>
      </View>
      <View style={styles.projectStyle}>
        <View>
          <Text style={styles.name}>{project.name}</Text>
          <View style={styles.extra}>
            <View style={styles.iconBox}>
              <Icon name="calendar-text" size={20} style={styles.infoIcon} />
              <Text>{project.total_tasks}</Text>
            </View>
            <View style={styles.iconBox}>
              <Icon name="calendar-check" size={20} style={styles.infoIcon} />
              <Text>{project.tasks_inprogress}</Text>
            </View>
            <View style={styles.iconBox}>
              <Icon name="calendar-clock" size={20} style={styles.infoIcon} />
              <Text>{project.tasks_closed}</Text>
            </View>
          </View>
        </View>
        {Number(activeTask.project) === Number(project.project_id) && (
          <View style={styles.trackViewStyle}>
            <View style={styles.timerStart}>
              <Icon name="play" size={32} color="#fff" />
            </View>
            <Text style={styles.trackTextStyle}>Tracking</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
  },
  statusWapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completed: {
    color: Config.successColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inprogress: {
    color: Config.warningColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  hold: {
    color: Config.errorColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  other: {color: Config.textColor, fontWeight: 'bold', fontSize: 16},
  date: {
    color: Config.textColor,
    fontSize: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Config.textDark,
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',

    marginRight: 10,
  },
  infoIcon: {
    color: Config.textColor,
    marginRight: 5,
  },
  extra: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timerStart: {
    backgroundColor: Config.primaryLight,
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  projectStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  trackViewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  trackTextStyle: {color: 'red', fontWeight: '500', opacity: 0.5},
})

export default ProjectCard
