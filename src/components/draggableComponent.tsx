import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {DraggableComponentProps} from '../interfaces/componentsInterface/componentInterfaces';

const DraggableComponent = ({
  visible,
  renderComponent,
}: DraggableComponentProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return visible ? (
    <Animated.View
      style={[styles.box, {transform: pan.getTranslateTransform()}]}
      {...panResponder.panHandlers}>
      {renderComponent && renderComponent({})}
    </Animated.View>
  ) : null;
};

export default React.memo(DraggableComponent);
const styles = StyleSheet.create({
  box: {
    borderColor: 'lightgray',
    borderWidth: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});
