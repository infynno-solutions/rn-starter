import React from 'react'
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import RenderHTML from 'react-native-render-html'

const KeyResponsibility = ({keyResponsibility}) => {
  const {width} = useWindowDimensions()

  return (
    <View style={styles.mainView}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.titleViewStyle}>
          <Text style={styles.titleTextStyle}>
            Your Key Responsibility Area
          </Text>
          <View style={styles.bottomLineStyle} />
          {keyResponsibility?.map((responsibility) => {
            return (
              <View key={responsibility?.id}>
                <RenderHTML
                  contentWidth={width}
                  source={{
                    html: responsibility?.key_responsibility_area ?? '',
                  }}
                  enableExperimentalMarginCollapsing={true}
                />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default KeyResponsibility

const styles = StyleSheet.create({
  bottomLineStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 10,
    width: '100%',
  },
  mainView: {
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 3,
  },
  titleTextStyle: {paddingVertical: 10, fontSize: 20, fontWeight: '800'},
  titleViewStyle: {flex: 1, marginLeft: 10},
})
