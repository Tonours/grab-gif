import React from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Clipboard } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
class ItemPage extends React.Component {
  static route = {
   navigationBar: {
     title(params) {
        return `Gifs of ${params.data.name}`;
      }
    }
  }
  constructor() {
    super();
    this.expression = /-/gi;
    this.state = {
      isAnimating: true,
      image: null,
      imageWidth: 350,
      imageHeight: 350
    };
  }
  componentWillMount() {
    this.url = this.props.route.params.data.url;
    this.setState({
      request: this.url.replace(this.expression, '+')
    });
    this._getData(this.state.request);
  }
  componentWillUnmount() {
      clearTimeout(this._timer);
  }
  _getData(value = 'not+found') {
      return fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${value}`)
          .then( (response) => response.json())
          .then( (responseJson) => {
              this.setState({
                  isAnimating: false,
                  image: responseJson.data.image_url,
                  content: responseJson.data.caption
              });

              this._timer = setTimeout(() => {
                this._getData(this.state.request);
              }, 5000);
          })
          .catch( (error) => {
              console.log(error);
          });
  }
  _setClipboard = async() => {
    if (!this.state.image) {
      return false;
    }

    try {
      let content = await Clipboard.getString();
      alert('Image copy to clipboard');
    } catch(e) {
      let content = e.message;
      alert(content);
    }
  }
  _getLoader() {
    return (
      <ActivityIndicator
        animating={this.state.isAnimating}
        style={styles.loader}
        size="large" />
    )
  }
  _getImage() {
    return (
      <TouchableWithoutFeedback
        onPress={this._setClipboard.bind(this)}>
        <View style={styles.base}>
          <Image
            source={{uri: this.state.image}}
            style={{
              width: 300,
              height: 350
            }}
            resizeMode="contain"/>
          <Text
            style={styles.text}>
            Press image to copy link to clipboard
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    return this.state.isAnimating ? this._getLoader() : this._getImage();
  }
}

const styles = {
  base: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
}

export default ItemPage;
