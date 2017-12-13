import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, TextInput, ScrollView, Image, FlatList, SectionList } from 'react-native';
class Kuai extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const listItems = []
    for (let i=0; i<5; i++) {
      listItems.push(<Image source={require('./img/favicon.jpg')} key={i}/>)
    }
    return (
      <View>
        <Text style={{fontSize:96}}>{this.props.text}</Text>
        {listItems}
      </View>
    )
  }
}
export default class FixedDimensionsBasics extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type to translate"
          onChangeText={(text)=>this.setState({text})}/>
        <Text style={{padding: 10, fontSize: 50}}>{this.state.text.split(' ').map(val => val && '🍕').join('')}</Text>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        />
        <FlatList
          data={[
            'Scroll me plz', 'If you like', 'Scrolling down', `What's the best`, 'Framework around?', 'React Native'
          ]}
          renderItem={({item}) => <Kuai text={item}/>}
        />

      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
AppRegistry.registerComponent('helloworld', () => LotsOfStyles);