import React, {Component} from 'react'
import {StyleSheet, Linking} from 'react-native'
import {View, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../../common'

class InterviewCard extends Component {
  state = {
    showDetails: false,
  }

  render() {
    const {interview, navigation} = this.props

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.setState({showDetails: !this.state.showDetails})}>
          <View style={styles.extra}>
            <View style={styles.from}>
              <Text style={styles.title}>Name</Text>
              {interview.candidate_details && (
                <Text>{interview.candidate_details.full_name}</Text>
              )}
            </View>
            <View style={styles.from}>
              <Text style={styles.title}>Experience</Text>
              {interview.candidate_details && (
                <Text>{interview.candidate_details.experience}</Text>
              )}
            </View>
          </View>
          <View style={styles.extra}>
            <View style={styles.from}>
              <Text style={styles.title}>Date</Text>
              <Text>
                {interview.date} {interview.time}
              </Text>
            </View>
            <View style={styles.from}>
              <Text style={styles.title}>Stage</Text>
              {interview.candidateinterviewstage && (
                <Text>{interview.candidateinterviewstage.name}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        {this.state.showDetails && (
          <>
            <View style={styles.divider} />
            <View style={styles.extra}>
              <View style={styles.from}>
                <Text style={styles.title}>CTC</Text>
                {interview.candidate_details && (
                  <Text>{interview.candidate_details.ctc}</Text>
                )}
              </View>
              <View style={styles.from}>
                <Text style={styles.title}>Expected</Text>
                {interview.candidate_details && (
                  <Text>{interview.candidate_details.expected_ctc}</Text>
                )}
              </View>
              <View style={styles.from}>
                <Text style={styles.title}>Mobile No</Text>
                {interview.candidate_details && (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `tel:${interview.candidate_details.contact_no}`
                      )
                    }>
                    <Text>{interview.candidate_details.contact_no}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.spacing} />
            <View style={styles.from}>
              <Text style={styles.title}>Other Details</Text>
              {interview.candidate_details && (
                <Text>{interview.candidate_details.other_details}</Text>
              )}
            </View>
            <View style={styles.spacing} />
            <View style={styles.from}>
              <Text style={styles.title}>Email</Text>
              {interview.candidate_details && (
                <Text>{interview.candidate_details.email}</Text>
              )}
            </View>
            <View style={styles.spacing} />
            <View style={styles.from}>
              <Text style={styles.title}>Feedback</Text>
              <Text>{interview.feedback || 'NA'}</Text>
            </View>
          </>
        )}
        {this.state.showDetails && (
          <View style={styles.actionWrapper}>
            {interview.candidate_details &&
              interview.candidate_details.documents_url && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    Linking.openURL(interview.candidate_details.documents_url)
                  }>
                  <Text style={styles.editButtonText}>
                    <Icon name="link-variant" size={20} />
                  </Text>
                </TouchableOpacity>
              )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('InterviewFeedback', {
                  interviewId: interview.id,
                  status: interview.status,
                  feedback: interview.feedback,
                })
              }>
              <Text style={styles.editButtonText}>
                <Icon name="comment-text-multiple-outline" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  extra: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
  title: {fontWeight: 'bold'},
  divider: {
    borderBottomColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  actionWrapper: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Config.successColor,
  },
  editButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  spacing: {
    marginVertical: 5,
  },
  from: {flex: 1},
})

export default InterviewCard
