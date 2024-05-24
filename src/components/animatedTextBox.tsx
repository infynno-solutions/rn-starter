import React, {useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import colors from '../constants/color';
import Icons from './vectorIconSet';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AnimatedInput({
  value,
  onChange,
  placeholder,
  multiline,
  error,
  labelBgColor,
  ...props
}: TextInputProps & {
  error: string | boolean;
  labelBgColor: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputHeight, setHeight] = useState(45);
  const [placeholderWidth, setWidth] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 1.85],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 4],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  const bgColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, labelBgColor || colors.lightgray],
  });

  const colorLabel = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.grey, colors.black],
  });

  const onFocus = () => animate(1);
  const onBlur = () => !value && animate(0);
  const animate = (val: number) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View
        style={[styles.inputContainer, error ? {borderColor: colors.red} : {}]}
        onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
        <View style={{height: inputHeight, ...styles.placeholderContainer}}>
          <Animated.Text
            style={[
              styles.placeholder,
              {transform: [{translateY}, {translateX}, {scale}]},
              {backgroundColor: bgColor, color: colorLabel},
            ]}
            onTextLayout={e =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }>
            {placeholder}
          </Animated.Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              multiline && {height: 100, textAlignVertical: 'top'},
            ]}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={multiline}
            secureTextEntry={showPassword}
            {...props}
          />
          {props?.keyboardType === ('password' as string) && (
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              activeOpacity={0.1}>
              {!showPassword ? (
                <Icons.Ionicons color={colors.black} name="eye" size={20} />
              ) : (
                <Icons.Ionicons color={colors.black} name="eye-off" size={20} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {flexDirection: 'row', alignItems: 'center'},
  container: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: colors.white,
  },
  input: {flex: 0.96, height: 45, paddingHorizontal: 10, fontSize: 15},
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    position: 'absolute',
    marginHorizontal: 10,
    paddingHorizontal: 5,

    borderRadius: 10,
  },
  errorMsg: {
    color: '#FF3242',
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: 13,
  },
});
