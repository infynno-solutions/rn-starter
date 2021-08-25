import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Config} from '../../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

const ProjectCard = ({navigation, project}) => {
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
        <Text style={styles.date}>{`${moment(project.start_date).format(
          'DD MMM'
        )} - ${moment(project.end_date).format('DD MMM')}`}</Text>
      </View>
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
    marginTop: 5,
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
})

export default ProjectCard
