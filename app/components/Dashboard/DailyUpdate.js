import moment from 'moment/moment'
import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {Config} from '../../common'

const DailyUpdate = ({dailyUpdates, profile}) => {
  const [dailyUpdatesData, setDailyUpdatesData] = useState([])

  useEffect(() => {
    const result = []
    dailyUpdates.forEach((item) => {
      const existingItem = result.find(
        (x) => x.tracked_date === item.tracked_date
      )
      if (existingItem) {
        existingItem.project.push({
          project_name: item.project_name,
          tracked_hour: item.tracked_hour,
          notes: item.notes,
        })
      } else {
        result.push({
          tracked_date: item.tracked_date,
          project: [
            {
              project_name: item.project_name,
              tracked_hour: item.tracked_hour,
              notes: item.notes,
            },
          ],
        })
      }
    })

    setDailyUpdatesData(result)
  }, [dailyUpdates])

  return (
    <View style={styles.dailyUpdateView}>
      <View style={styles.dailyUpdateContent}>
        <View style={styles.titleViewStyle}>
          <Text style={styles.titleStyle}>Daily Update</Text>
          <View style={styles.bottomLineStyle} />
          <View>
            {dailyUpdatesData.length > 0 ? (
              <FlatList
                data={dailyUpdatesData}
                nestedScrollEnabled={true}
                keyExtractor={(_, index) => index}
                renderItem={({item, index}) => (
                  <View key={index} style={styles.dateViewStyle}>
                    <Text style={styles.dateTextStyle}>
                      Date: {moment(item.tracked_date).format('DD-MM-YYYY')}
                    </Text>
                    <View
                      style={[styles.bottomLineStyle, {paddingVertical: 5}]}
                    />
                    {item?.project.map((project, projectIndex) => (
                      <View key={projectIndex} style={{marginTop: 10}}>
                        <View style={styles.titleTrackedStyle}>
                          <Text style={styles.trackedHoursStyle}>
                            {profile?.full_name}
                          </Text>
                          <Text style={styles.trackedHoursStyle}>
                            {project?.tracked_hour}
                          </Text>
                        </View>
                        <Text style={styles.projectNameTextStyle}>
                          {project.project_name}
                        </Text>
                        <Text style={styles.projectNoteStyle}>
                          {project.notes}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              />
            ) : (
              <View style={styles.noDailyReportingStyle}>
                <Text style={styles.noDailyReportingTextStyle}>
                  Not available previous 5 days reporting...
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default DailyUpdate

const styles = StyleSheet.create({
  bottomLineStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 10,
    width: '100%',
  },
  dailyUpdateView: {
    padding: 5,
    paddingBottom: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 3,
    height: 500,
  },
  titleStyle: {paddingVertical: 10, fontSize: 20, fontWeight: '800'},
  dateTextStyle: {color: '#736cc7', fontSize: 16, fontWeight: '600'},
  projectNameTextStyle: {color: 'green', fontWeight: '600'},
  projectNoteStyle: {marginLeft: 10, color: '#617182'},
  dateViewStyle: {paddingVertical: 10, paddingLeft: 5},
  dailyUpdateContent: {
    flexDirection: 'row',
    maxHeight: 420,
  },
  titleViewStyle: {flex: 1, marginLeft: 10},
  noDailyReportingStyle: {
    height: 150,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  noDailyReportingTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Config.primayColor,
  },
  trackedHoursStyle: {
    fontWeight: '600',
    fontSize: 16,
  },
  titleTrackedStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 10,
  },
})
