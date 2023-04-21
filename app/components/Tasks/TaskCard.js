import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Config} from '../../common'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {startTimer, endTimer, deleteTimer, fetchTasks} from './TasksActions'
import moment from 'moment'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {ProgressBar} from '@react-native-community/progress-bar-android'

function formatTimeString(time, showMsecs) {
  let msecs = time % 1000

  if (msecs < 10) {
    msecs = `00${msecs}`
  } else if (msecs < 100) {
    msecs = `0${msecs}`
  }

  let seconds = Math.floor(time / 1000)
  let minutes = Math.floor(time / 60000)
  let hours = Math.floor(time / 3600000)
  seconds = seconds - minutes * 60
  minutes = minutes - hours * 60
  let formatted
  if (showMsecs) {
    formatted = `${hours < 10 ? 0 : ''}${hours}:${
      minutes < 10 ? 0 : ''
    }${minutes}:${seconds < 10 ? 0 : ''}${seconds}:${msecs}`
  } else {
    formatted = `${hours < 10 ? 0 : ''}${hours}:${
      minutes < 10 ? 0 : ''
    }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
  }

  return formatted
}

class TaskCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerStatus: '',
      noteVisible: false,
    }
    this.taskValidation = Yup.object().shape({
      note: Yup.string().required(),
    })
  }

  setToggleStatus = () => {
    this.setState({
      timerStatus: this.state.timerStatus === 'Stop' ? 'Start' : 'Stop',
    })
  }

  startTimer = async (taskId, projectId, taskName, projectName) => {
    const startTime = new Date().getTime()
    const startTimeOriginal = moment(new Date(startTime)).format()

    await this.props.startTimer(
      taskId,
      projectId,
      startTime.toString(),
      startTimeOriginal,
      taskName,
      projectName
    )
  }

  endTimer = async ({taskId, projectId, taskName, projectName, note}) => {
    // console.warn(note);
    const startTime = new Date(this.props.state.activeTask.start).getTime()

    const startTimeOriginal = moment(new Date(startTime)).format()
    const endTime = new Date().getTime()
    const endTimeOriginal = moment(new Date(endTime)).format()
    const diff = formatTimeString(endTime.toString() - startTime.toString())
    await this.props.endTimer(
      taskId,
      projectId,
      startTime.toString(),
      startTimeOriginal,
      endTime.toString(),
      endTimeOriginal,
      diff,
      taskName,
      projectName,
      note
    )
  }

  render() {
    const {task} = this.props
    const {noteVisible} = this.state
    const progress = task.total_tracked_hours.toFixed(2) / task.hours

    let statusStyle
    if (task.task_status === 'Completed') {
      statusStyle = styles.completed
    } else if (task.task_status === 'In Progress') {
      statusStyle = styles.inprogress
    } else if (task.task_status === 'On Hold') {
      statusStyle = styles.hold
    } else {
      statusStyle = styles.other
    }
    let priorityStyle
    if (task.task_priority === 'High') {
      priorityStyle = styles.hold
    } else if (task.task_priorityStyle) {
      priorityStyle = styles.inprogress
    } else if (task.task_priority === 'Low') {
      priorityStyle = styles.completed
    }

    return (
      <TouchableOpacity style={styles.taskWrapper}>
        <View style={styles.statusWapper}>
          <Text style={statusStyle}>{task.task_status} </Text>
          <Text style={styles.date}>{`${moment(task.start_date).format(
            'DD MMM'
          )} - ${moment(task.end_date).format('DD MMM')}`}</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.taskNameWrapper}>
            <Text style={styles.name}>{task.title}</Text>
            <View style={styles.statusPriority}>
              <Text style={styles.other}>Priority: </Text>
              <Text style={priorityStyle}>{task.task_priority}</Text>
            </View>
          </View>
          <View style={styles.actionWrapper}>
            {this.props.state.activeTask &&
              this.props.state.activeTask.start !== null &&
              // eslint-disable-next-line eqeqeq
              this.props.state.activeTask.task == task.id && (
                <TouchableOpacity
                  onPress={async () => {
                    this.setToggleStatus()
                    this.setState({noteVisible: true})
                  }}>
                  <View style={styles.timerStop}>
                    <MaterialCommunityIcons
                      name="stop"
                      size={20}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
              )}
            {this.props.state.activeTask &&
              this.props.state.activeTask.start === null && (
                <TouchableOpacity
                  onPress={async () => {
                    await this.startTimer(
                      task.id,
                      task.project_id,
                      task.title,
                      task.project.name
                    )
                    this.setToggleStatus()
                  }}>
                  <View style={styles.timerStart}>
                    <MaterialCommunityIcons
                      name="play"
                      size={20}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
              )}
          </View>
        </View>
        <View style={styles.progressCount}>
          <Text>Tracked: {task.total_tracked_hours.toFixed(2)}</Text>
          <Text>Total: {task.hours}</Text>
        </View>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          color={Config.warningColor}
        />

        {this.props.state.activeTask &&
          this.props.state.activeTask.start !== null &&
          // eslint-disable-next-line eqeqeq
          this.props.state.activeTask.task == task.id &&
          noteVisible === true && (
            <View>
              <Formik
                initialValues={{
                  taskId: task.id,
                  projectId: task.project_id,
                  taskName: task.title,
                  projectName: task.project.name,
                  note: task.description,
                }}
                validationSchema={this.taskValidation}
                onSubmit={async (values) => {
                  // console.warn(values);
                  this.setState({noteVisible: false})
                  await this.endTimer(values)
                }}>
                {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                  <>
                    <View style={styles.note}>
                      <TextInput
                        placeholder="What you have worked?"
                        multiline={true}
                        underlineColorAndroid="transparent"
                        onBlur={handleBlur('note')}
                        onChangeText={handleChange('note')}
                        value={values.note}
                        error={errors.note}
                        textAlignVertical="top"
                        numberOfLines={10}
                        style={styles.textArea}
                      />
                      {errors.note && (
                        <Icon
                          name="alert-circle-outline"
                          size={20}
                          color={Config.errorColor}
                        />
                      )}
                    </View>
                    <View style={styles.buttonsWrapper}>
                      <TouchableOpacity
                        style={styles.submit}
                        onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.delete}
                        onPress={() => this.props.deleteTimer()}>
                        <Text style={styles.submitText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  taskWrapper: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
    padding: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
  },
  taskNameWrapper: {
    flex: 1,
  },
  statusWapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusPriority: {flexDirection: 'row'},
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
    paddingRight: 5,
  },
  actionWrapper: {},
  timerStart: {
    backgroundColor: Config.successColor,
    color: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  timerStop: {
    backgroundColor: Config.errorColor,
    color: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  note: {
    borderColor: '#808080',
    borderWidth: 1,
    padding: 5,
    marginTop: 25,
    borderRadius: 4,
  },
  textArea: {
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'black',
  },
  submit: {
    backgroundColor: Config.successColor,
    color: '#fff',
    padding: 18,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginRight: 5,
  },
  delete: {
    backgroundColor: Config.errorColor,
    color: '#fff',
    padding: 18,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  progressCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
})

const mapStateToProps = (state) => {
  return {
    state: state.TasksReducers,
  }
}

export default connect(mapStateToProps, {
  startTimer,
  endTimer,
  deleteTimer,
  fetchTasks,
})(TaskCard)
