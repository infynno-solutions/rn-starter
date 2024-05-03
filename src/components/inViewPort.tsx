import React, {Component} from 'react';
import {View, Dimensions, ViewProps} from 'react-native';
import {
  InViewPortProps,
  InViewPortState,
} from '../interfaces/componentsInterface/componentInterfaces';

export default class InViewPort extends Component<
  InViewPortProps,
  InViewPortState
> {
  lastValue: null | undefined;
  interval: any;
  myview: any;

  constructor(props: InViewPortProps) {
    super(props);
    this.state = {
      rectTop: 1,
      rectBottom: 1,
      rectWidth: Dimensions.get('window').width,
    };
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.stopWatching();
  }

  componentDidUpdate(prevProps: InViewPortProps) {
    if (this.props.disabled && !prevProps.disabled) {
      this.stopWatching();
    } else if (!this.props.disabled && prevProps.disabled) {
      this.startWatching();
    }
  }

  startWatching() {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      if (!this.myview) {
        return;
      }
      this.myview.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          this.setState({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        },
      );
      this.isInViewPort();
    }, this.props.delay || 100);
  }

  stopWatching() {
    clearInterval(this.interval);
  }

  isInViewPort() {
    const window = Dimensions.get('window');
    const {height, width} = window;

    const isVisible =
      this.state.rectBottom !== 0 &&
      this.state.rectTop >= 0 &&
      this.state.rectBottom <= height &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= width;

    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible;
      this.props.onChange(isVisible);
    }
  }

  render() {
    return (
      <View
        collapsable={false}
        ref={component => {
          this.myview = component;
        }}
        {...this.props}>
        {this.props.children}
      </View>
    );
  }
}
