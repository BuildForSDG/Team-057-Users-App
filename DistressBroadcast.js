import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class DistressBroadcast extends React.Component {
    render () {
        return (
            <>
                <View>
                    <Text h1>This is the "Distress Broadcast" feature</Text>
                    <Text>Click on the button to broadcast a distress call </Text>
                    {/* <Text>I am going to be your road assistant...</Text> */}
                </View>
            </>
        );
    }
}

export default DistressBroadcast;