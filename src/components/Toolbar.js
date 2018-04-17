import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import Theme from './Theme'

let statusBarSize = (Platform.OS === 'ios' ? 16 : 0)

export default class Toolbar extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    renderBackButton: PropTypes.func,
    renderRightButton: PropTypes.func,
    renderTitle: PropTypes.func,

    title: PropTypes.string,
    textColor: PropTypes.string
  }

  static defaultProps = {
    textColor: 'white'
  }

  render () {
    const {style} = this.props
    return (
      <Animated.View
        style={[styles.container, style]}
        shouldRasterizeIOS
        renderToHardwareTextureAndroid>
        {this._renderBackButton()}
        {this._renderTitle()}
        {this._renderRightButton()}
      </Animated.View>
    )
  }

  _renderBackButton () {
    const {renderBackButton} = this.props
    if (renderBackButton) {
      return renderBackButton()
    }

    return null
  }

  _renderTitle () {
    const {renderTitle, title, textColor} = this.props
    if (renderTitle) {
      return renderTitle()
    } else {
      return (
        <View style={[styles.titleStyle]}>
          <Text
            style={[styles.titleTextStyle, {
              color: textColor
            }]}
            numberOfLines={1}>
            {title}
          </Text>
        </View>
      )
    }
  }

  _renderRightButton () {
    const {renderRightButton} = this.props
    if (renderRightButton) {
      return renderRightButton()
    }

    return null
  }
}

const { width } = Dimensions.get('window')

let styles = StyleSheet.create({
  container: {
    height: Theme.size.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171a23'
  },
  titleStyle: {
    width: (width * 0.7),
    alignSelf: 'center'
  },
  titleTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  }
})