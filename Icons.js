import React, { Component } from "react";
import {
  View
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

class Icons extends Component {
  render() {
    return (
        <>
            <View>
                <Icon name="search" size={60} color="#000" />
                <Icon name="search" size={60} color="#000" solid />
                <Icon name="search" size={60} color="#000" light />
            </View>
        </>
    );
  }
}

export default Icons;