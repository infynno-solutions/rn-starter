import React from 'react'
import {View, Text as NativeText, ScrollView} from 'react-native'
import {BarChart, XAxis} from 'react-native-svg-charts'
import {Text} from 'react-native-svg'
import * as scale from 'd3-scale'
import moment from 'moment'

const Chart = ({data, name}) => {
  const CUT_OFF = 2
  // eslint-disable-next-line no-shadow
  const Labels = ({x, y, bandwidth, data}) =>
    data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + bandwidth / 2}
        y={value.hours < CUT_OFF ? y(value.hours) - 10 : y(value.hours) + 15}
        fontSize={16}
        fill={value.hours >= CUT_OFF ? 'white' : 'black'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>
        {value.hours === '00.00' ? '' : value.hours.replace('.', ':')}
      </Text>
    ))

  return (
    <View
      style={{
        padding: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 3,
      }}>
      <ScrollView horizontal={true}>
        <View
          style={{
            height: 200,
            flexDirection: 'row',
            width: data?.length * 55,
          }}>
          <View style={{flex: 1, marginLeft: 10}}>
            <BarChart
              style={{flex: 1}}
              data={data}
              svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
              contentInset={{top: 10, bottom: 10}}
              spacing={0.2}
              yAccessor={({item}) => Number(item.hours)}
              gridMin={0}>
              <Labels />
            </BarChart>
            <XAxis
              data={data}
              formatLabel={(value, index) =>
                moment(data[index].log_date).format('D MMM')
              }
              scale={scale.scaleBand}
              svg={{fontSize: 10, fill: 'black'}}
            />
          </View>
        </View>
      </ScrollView>
      <NativeText
        style={{textAlign: 'center', fontSize: 18, marginVertical: 10}}>
        {name}
      </NativeText>
    </View>
  )
}

export default Chart
