import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Navigation } from "react-native-navigation";

import { storeData, getData } from './Storage';

class Onboarding extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <>
                <Swiper ref='swiper' showsPagination={true} bounces={true} loop={false}>
                    <SafeAreaView>
                        <View>
                            <Text>Welcome to Road Assistant</Text>
                            <Button title="Next" onPress={() => this.refs.swiper.scrollBy(1)} />
                        </View>
                    </SafeAreaView>
                    <SafeAreaView>
                        <View>
                            <Text>Welcome to Road Assistant</Text>
                            <Button title="Next" onPress={() => this.refs.swiper.scrollBy(-1)} />
                            <Button title="Open App" onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: "WelcomeScreen",
                                    options: {
                                        topBar: {
                                            title: {
                                                text: "WelcomeScreen"
                                            }
                                        }
                                    }
                                }
                            })} />
                        </View>
                    </SafeAreaView>
                </Swiper>
            </>
        );
    }
}

export default Onboarding;
