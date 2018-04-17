import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native'
import PropTypes from 'prop-types'
import Theme from './Theme'

let statusBarSize = (Platform.OS === 'ios' ? 20 : 0)

export default class Toolbar extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    renderToolbar: PropTypes.func
  }

  render () {
    const {style} = this.props
    return (
      <Animated.View
        style={[styles.container, style]}
        shouldRasterizeIOS
        renderToHardwareTextureAndroid>
        {this._renderToolbar()}
      </Animated.View>
    )
  }

  _renderToolbar () {
    const {renderToolbar} = this.props
    if (renderToolbar) {
      return renderToolbar()
    }

    return null
  }
}

let styles = StyleSheet.create({
  container: {
    height: Theme.size.headerHeight,
    paddingTop: Theme.size.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171a23'
  }
})
