import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { createRouter, withNavigation } from '@exponent/ex-navigation';
import Item from './Item';
import ItemPage from './ItemPage';

export const Router = createRouter( () => ({
  home: () => Home,
  item: () => ItemPage
}));

@withNavigation
class Home extends React.Component {
  static route = {
    navigationBar: {
      title: 'Homepage'
    }
  }
  constructor() {
    super();
    this.data = [
      {id: 1, name: 'South Park', image: require('./images/southpark.jpg'), url: 'south-park'},
      {id: 2, name: 'The Simpsons', image: require('./images/the-simpson.png'), url: 'the-simpson'},
      {id: 3, name: 'Futurama', image: require('./images/futurama.png'), url: 'futurama'}
    ];
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.data.map( (item) => {
            return <Item key={item.id} data={item} onPress={this._goToRoute.bind(this)} />;
          })}
        </ScrollView>
      </View>
    )
  }
  _goToRoute(params) {
    if (!params) {
      return false;
    }
    this.props.navigator.push(Router.getRoute('item', {data: params}));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default Home;
