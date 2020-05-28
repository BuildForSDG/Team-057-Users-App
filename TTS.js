import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import reactNativeTts from 'react-native-tts';

class DistressBroadcast extends React.Component {

    _test () {
        reactNativeTts.setDucking(true);

        reactNativeTts.setDefaultPitch(0);

        reactNativeTts.getInitStatus().then(() => {
            reactNativeTts.speak('Hello, world! I am Salvador. I am going to be your road assistant. Nice to meet you sir.');
        });
    }

    render () {
        return (
            <>
                <View>
                    <Text h1>This is the "Text to Speech" feature</Text>
                    <Text>Click on the button to speak </Text>
                    {/* <Text>I am going to be your road assistant...</Text> */}
                    <Button
                        title='Speak'
                        color='#000cff'
                        style={{ padding: 10 }}
                        onPress={this._test()}
                    />
                </View>
            </>
        );
    }
}

export default DistressBroadcast;