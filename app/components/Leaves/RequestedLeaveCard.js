import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import CustomTextInput from '../CustomTextInput'
import {Config} from '../../common'
import {Formik} from 'formik'
import {connect} from 'react-redux'
import {updateStatus} from './LeavesActions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

class RequestedLeaveCard extends Component {
  state = {
    showDetails: false,
  }

  render() {
    const {leave, state} = this.props

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
              <View>
                <View>
                  <Text style={styles.title}>By</Text>
                  <Text>{leave.request_user_name_by}</Text>
                </View>
                <View style={styles.from}>
                  <Text style={styles.title}>From</Text>
                  <Text>{moment(leave.start_date).format('DD MMM YYYY')}</Text>
                </View>
              </View>
              <View>
                <View style={styles.from}>
                  <Text style={styles.title}>Type</Text>
                  <Text>{leave.type_text}</Text>
                </View>
                <View style={styles.from}>
                  <Text style={styles.title}>To</Text>
                  <Text>{moment(leave.end_date).format('DD MMM YYYY')}</Text>
                </View>
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
                  <Text style={styles.title}>Request On</Text>
                  <Text>
                    {moment(leave.requested_date).format('DD MMM YYYY')}
                  </Text>
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

          <View style={styles.reasonWrapper} />
          {this.state.showDetails && leave.status === 'Pending' && (
            <>
              {state.updateStatus.loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Formik
                  initialValues={{leave_id: leave.id, comment: '', status: ''}}
                  onSubmit={async values =>
                    await this.props.updateStatus(values)
                  }>
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <>
                      <CustomTextInput
                        placeholderTextColor="#b6c0cb"
                        placeholder="Comment"
                        onBlur={handleBlur('comment')}
                        onChangeText={handleChange('comment')}
                      />

                      <View style={styles.actionWrapper}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setFieldValue('status', 'Approved')
                            handleSubmit()
                          }}>
                          <Text style={styles.editButtonText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => {
                            setFieldValue('status', 'Rejected')
                            handleSubmit()
                          }}>
                          <Text style={styles.deleteButtonText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </Formik>
              )}
            </>
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
  extra: {flex: 1, flexDirection: 'row'},
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
  requestedBy: {
    flexDirection: 'row',
    marginTop: 10,
  },
})

const mapStateToProps = state => {
  return {
    state: state.LeavesReducers,
  }
}

export default connect(mapStateToProps, {updateStatus})(RequestedLeaveCard)
