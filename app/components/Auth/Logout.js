import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import {Config} from '../../common'
import {connect} from 'react-redux'
import {logoutUser} from './AuthActions'

export function formatTimeString(time, showMsecs) {
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
class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  componentDidUpdate(prevPros) {
    // eslint-disable-next-line eqeqeq
    if (this.props != prevPros) {
      clearInterval(this.interval)
      this.interval = setInterval(() => this.forceUpdate(), 1000)
    }
  }

  render() {
    const {navigation} = this.props

    return (
      <View style={styles.actionContainer}>
        {this.props.task.activeTask &&
        this.props.task.activeTask.start !== null ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProjectDetails', {
                projectId: this.props.task.activeTask.project,
                projectName: this.props.task.activeTask.projectName,
              })
            }>
            <View style={styles.timerWrapper}>
              <Text style={styles.timerText}>
                {formatTimeString(
                  new Date().getTime() -
                    new Date(this.props.task.activeTask.start).getTime()
                )}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    width: 90,
  },
  timerWrapper: {
    backgroundColor: Config.accentColor,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  timerText: {color: '#fff', fontSize: 12},
  iconContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    state: state.AuthReducers,
    task: state.TasksReducers,
  }
}

export default connect(mapStateToProps, {logoutUser})(Logout)
