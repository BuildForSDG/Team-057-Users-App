import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Styles from './components/Styles';
import Colors from './components/Colors';

class App extends React.Component {
  render () {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={Styles.scrollView}>
            <View style={Styles.row}>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>

              <View style={Styles.card}>
                <Text style={{color: "#fff"}}>Step two</Text>
                <Text style={{color: "#fff"}}>
                  Edit <Text style={Styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
