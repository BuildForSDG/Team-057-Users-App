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
                            <Text>Next you have to get an account set up.</Text>
                            <Button title="Set up my account" onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: "OnboardUser",
                                    options: {
                                        topBar: {
                                            title: {
                                                text: "OnboardUser"
                                            }
                                        }
                                    }
                                }
                            })} />
                            <Button title="Open Home Screen" onPress={() => Navigation.push(this.props.componentId, {
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
