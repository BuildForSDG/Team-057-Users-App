import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from './mapStyle';

const { width, height } = Dimensions.get("screen");

class DistressBroadcast extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dim: {
                wa: width - 120,
                ha: width - 120,
                wb: width - 80,
                hb: width - 80,
                wc: width - 80,
                hc: width - 80,
            }
        }
    }

    _ripple = () => {        
        setTimeout(() => {
            let { wa, ha } = this.state.dim;

            if (ha >= height) {
                wa = width - 80;
                ha = width - 80;
            }
            else {
                wa += 60;
                ha += 60;
            }

            let dim = { wa, ha };

            // console.log(JSON.stringify(dim));

            this.setState({
                dim: dim,
            });

        }, 10);

        // setTimeout(() => {
        //     let { wb, hb } = this.state.dim;

        //     if (hb >= height) {
        //         wb = width - 80;
        //         hb = width - 80;
        //     }
        //     else {
        //         wb += 60;
        //         hb += 60;
        //     }

        //     let dim = { wb, hb };

        //     // console.log(JSON.stringify(dim));

        //     this.setState({
        //         dim: dim,
        //     });

        // }, 20);

        // setTimeout(() => {
        //     let { wc, hc } = this.state.dim;

        //     if (hc >= height) {
        //         wc = width - 80;
        //         hc = width - 80;
        //     }
        //     else {
        //         wc += 60;
        //         ha += 60;
        //     }

        //     let dim = { wc, hc };

        //     // console.log(JSON.stringify(dim));

        //     this.setState({
        //         dim: dim,
        //     });

        // }, 30);
    }
    
    render () {
        return (
            <>
                {this._ripple()}
                <View style={[styles.container, styles.flexCenter]}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 45,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        customMapStyle={mapStyle.dark}
                    />
                    <View style={[styles.flexCenter, styles.distress]}>
                        <Icon name="warning" color="red" size={128} />
                        <Text style={[styles.yellow, styles.upCase, styles.textL]}>Distress</Text>
                        <Text style={[styles.white, styles.upCase, styles.textM]}>Broadcast</Text>
                    </View>
                    <View style={styles.mapDimmer} />
                    <View style={{ ...styles.ripple, width: this.state.dim.wa, height: this.state.dim.ha, }} />
                    {/* <View style={{ ...styles.ripple, width: this.state.dim.wb, height: this.state.dim.hb, }} />
                    <View style={{ ...styles.ripple, width: this.state.dim.wc, height: this.state.dim.hc, }} /> */}
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
    mapDimmer: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    distressBtn: {
        backgroundColor: "#ff0000",
        height: 124,
        width: 124,
        borderRadius: 200,
    },
    flexCenter: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    white: {
        color: "#ffffff",
    },
    yellow: {
        color: "#fcc201",
    },
    upCase: {
        textTransform: "uppercase",
    },
    textL: {
        fontWeight: "bold",
        fontSize: 48,
        margin: 0,
    },
    textM: {
        fontSize: 24,
        margin: 0,
    },
    ripple: {
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius: 600,
        position: "absolute",
        zIndex: 2,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
      zIndex: 0,
    },
});

export default DistressBroadcast;