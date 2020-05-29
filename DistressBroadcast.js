import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from './mapStyle';

class DistressBroadcast extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <>
                <View style={[styles.container, styles.flexCenter]}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        customMapStyle={mapStyle.dark}
                    />
                    <View style={[styles.flexCenter, styles.distress]}>
                        <TouchableOpacity
                            onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: "Broadcasting",
                                    options: {
                                        topBar: {
                                            title: {
                                            text: "Broadcasting"
                                            }
                                        }
                                    }
                                }
                            })}
                        >
                            <View style={[styles.distressBtn, styles.flexCenter]}>
                                <Icon name="warning" size={96} color="#ffffff" />
                                <Text style={[styles.white, { fontWeight: "bold", fontSize: 24 }]}>Broadcast</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        height: "100%",
        width: "100%",
    },
    distress: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        zIndex: 3,
    },
    distressBtn: {
        backgroundColor: "#ff0000",
        height: 180,
        width: 180,
        borderRadius: 200,
    },
    white: {
        color: "#ffffff",
    },
    flexCenter: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    mapDimmer: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
      zIndex: 0,
    },
});

export default DistressBroadcast;