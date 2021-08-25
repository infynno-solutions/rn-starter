import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {Config} from '../../common'
import {connect} from 'react-redux'
import {deleteLeave, fetchLeaves} from './LeavesActions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

class LeaveCard extends Component {
  state = {
    showDetails: false,
  }

  render() {
    const {leave, navigation} = this.props

    let statusStyle
    if (leave.status === 'Approved') {
      statusStyle = styles.statusApproved
    } else if (leave.status === 'Rejected') {
      statusStyle = styles.statusRejected
    } else {
      statusStyle = styles.statusPending
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({showDetails: !this.state.showDetails})}>
        <View style={styles.cardContainer}>
          <View style={styles.dateStatus}>
            <View style={styles.date}>
              <Icon name="calendar" size={32} style={styles.dateIcon} />
              <View style={styles.from}>
                <Text style={styles.title}>From</Text>
                <Text>{moment(leave.start_date).format('DD MMM YYYY')}</Text>
              </View>
              <View>
                <Text style={styles.title}>To</Text>
                <Text>{moment(leave.end_date).format('DD MMM YYYY')}</Text>
              </View>
            </View>
            <View>
              <View style={[styles.statusWrapper, statusStyle]}>
                <Text style={styles.statusText}>{leave.status}</Text>
              </View>
            </View>
          </View>
          {this.state.showDetails && (
            <>
              <View style={styles.divider} />
              <View style={styles.extra}>
                <View style={styles.from}>
                  <Text style={styles.title}>Request To</Text>
                  <Text>{leave.request_user_name}</Text>
                </View>
                <View style={styles.from}>
                  <Text style={styles.title}>Type</Text>
                  <Text>{leave.type_text}</Text>
                </View>
                <View style={styles.from}>
                  <Text style={styles.title}>Duration</Text>
                  <Text>{`${leave.day_duration} ${
                    leave.day_duration <= 1 ? 'day' : 'days'
                  }`}</Text>
                </View>
              </View>
              <View style={styles.reason} />
              <View style={styles.from}>
                <Text style={styles.title}>Reason</Text>
                <Text>{leave.reason}</Text>
              </View>
            </>
          )}
          {this.state.showDetails && leave.status === 'Pending' && (
            <View style={styles.actionWrapper}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('EditLeave', {leaveId: leave.id})
                }>
                <Text style={styles.editButtonText}>
                  <Icon name="pencil" size={20} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    'Delete Request',
                    'Are you sure want to delete this request.',
                    [
                      {
                        text: 'NO',
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: async () => {
                          await this.props.deleteLeave(leave.id)
                        },
                      },
                    ],
                    {cancelable: false}
                  )
                }}>
                <Text style={styles.deleteButtonText}>
                  <Icon name="trash-can" size={20} />
                  {/* Delete */}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
  },
  dateStatus: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  date: {flexDirection: 'row', flex: 1},
  dateIcon: {marginRight: 20, color: Config.textColor},
  from: {marginRight: 20},
  title: {fontWeight: 'bold'},
  statusWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 100,
  },
  statusApproved: {
    backgroundColor: Config.successColor,
  },
  statusRejected: {
    backgroundColor: Config.errorColor,
  },
  statusPending: {
    backgroundColor: Config.pendingColor,
  },
  statusText: {
    color: '#fff',
    textAlign: 'center',
  },
  extra: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
  divider: {
    borderBottomColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  reason: {
    marginVertical: 5,
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Config.successColor,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Config.errorColor,
  },
  editButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  deleteButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  actionWrapper: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 15,
    justifyContent: 'space-around',
  },
})

const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps, {deleteLeave, fetchLeaves})(LeaveCard)
