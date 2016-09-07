import React from 'react';
import { Text, Image, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
class Item extends React.Component {
    constructor() {
      super();
    }
    render() {
        return (
          <TouchableWithoutFeedback
            onPress={() => this.props.onPress(this.props.data)}>
            <View>
              <Image
                source={this.props.data.image}
                style={styles.image}>
                <View style={styles.imageInner}>
                  <Text style={styles.title}>{this.props.data.name}</Text>
                </View>
              </Image>
            </View>
          </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 250,
    marginTop: 10,
    marginBottom: 10
  },
  imageInner: {
    backgroundColor: 'rgba(0,0,0,.7)',
    width: 350,
    height: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    color: 'white'
  }
});

export default Item;
