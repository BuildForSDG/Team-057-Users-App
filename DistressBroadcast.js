import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from './mapStyle';
import Geolocation from '@react-native-community/geolocation';
import { getData, storeData } from './Storage';


const config = {
    skipPermissionRequests: false,
    authorizationLevel: "auto"
};

const { width, height } = Dimensions.get("screen");


class DistressBroadcast extends React.Component {
    constructor (props) {
        super(props);

        // this.setup();

        this.state = {
            region: this.initialRegion,
            broadcast: 0,
            dim: {
                wa: width - 120,
                ha: width - 120,
            }
        }
    }

    async componentDidMount () {

        this.lastBroadcast = {};

        this.broadcastsData = [];

        this.broadcasts = await getData('@distress_broadcasts');

        if (typeof this.broadcasts == "string") {

            this.broadcastsData = JSON.parse(this.broadcasts);

            if (this.broadcastsData.length > 0) {
                this.lastBroadcast = this.broadcastsData[this.broadcastsData.length - 1];

                console.log("This: " + JSON.stringify(this.lastBroadcast));

                if (this.lastBroadcast["Broadcasting"]) {
                    this.setState({ broadcast: 2 });
                }
            }

        }
        else {
            await storeData('@distress_broadcasts', []);
        }

        console.log(this.broadcasts);

        Geolocation.setRNConfiguration(config);
        Geolocation.getCurrentPosition(location => {
            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.6,
                }
            });
        });
    }

    async broadcast () {
        
        this.setState({ broadcast: 1 });

		fetch(`https://backend-057.herokuapp.com/api/distresses/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: {
                    lat: this.state.region.latitude,
                    lon: this.state.region.longitude,
                },
                data: {
                    "User ID" : "BlaBlaBla",
                    Date: Date.now()
                },
            }),
        })
		.then((response) => response.json())
		.then((json) => {
            this.broadcastsData.push(json.data);

            if (json.success) {

                storeData('@distress_broadcasts', this.broadcastsData);

                this.setState({ broadcast: 2 });
            }
            else {
                this.setState({ broadcast: -1 });
            }
		})
		.catch((error) => { this.setState({ broadcast: -1 }); console.error(error) });

        // setTimeout(() => {
        //     this.setState({ broadcast: 2 });
        // }, 2000);
        
    }

    async stopBroadcast () {
        
        this.setState({ broadcast: 1 });

        console.log(this.lastBroadcast["Distress ID"]);

		fetch(`https://backend-057.herokuapp.com/api/${this.lastBroadcast["Distress ID"]}/stop`, {
            method: 'GET',
        })
		.then((response) => response.json())
		.then((json) => {
            if (json.success) {

                this.broadcastsData[this.broadcastsData.length - 1]["Broadcasting"] = json.data["Broadcasting"];

                storeData('@distress_broadcasts', this.broadcastsData);

                this.setState({ broadcast: 0 });
            }
            else {

                storeData('@distress_broadcasts', this.broadcastsData);
                
                this.setState({ broadcast: 2 });
            }
		})
		.catch((error) => { this.setState({ broadcast: 2 }); console.error(error) });
    }

    clearError () {
        this.setState({ broadcast: 0 });
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

            this.setState({
                dim: dim,
            });

        }, 10);
    }

    render () {
        return (
            <>
                <View style={[styles.container, styles.flexCenter]}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={this.state.region}
                        customMapStyle={mapStyle.dark}
                    />
                    {
                        (this.state.broadcast) ? (
                            (this.state.broadcast == 2) ? (
                                <>
                                    {this._ripple()}
                                    <TouchableOpacity
                                        style={styles.distress}
                                        onPress={() => this.stopBroadcast()}
                                    >
                                        <View style={[styles.flexCenter]}>
                                            <Icon name="exclamation" color="red" size={128} />
                                            <Text style={[styles.red, styles.upCase, styles.textL]}>Distress</Text>
                                            <Text style={[styles.red, styles.upCase, styles.textM]}>Broadcast</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.mapDimmer} />
                                    <View style={{ ...styles.ripple, width: this.state.dim.wa, height: this.state.dim.ha, }} />
                                </>
                            ) : (this.state.broadcast == 1) ? (
                                <>
                                    <View style={[styles.flexCenter, styles.distress]}>
                                        <Icon name="exclamation" color="red" size={128} />
                                        <Text style={[styles.yellow, styles.upCase, styles.textL]}>Initializing</Text>
                                    </View>
                                    <View style={styles.mapDimmer} />
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.distress}
                                        onPress={() => this.clearError()}
                                    >
                                        <View style={[styles.flexCenter, styles.distress]}>
                                            <Icon name="exclamation" color="red" size={128} />
                                            <Text style={[styles.yellow, styles.upCase, styles.textL]}>Error</Text>
                                            <Text style={[styles.white, styles.upCase, styles.textM, {textAlign: "center"}]}>Could not broadcast your distress. Try again.</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.mapDimmer} />
                                </>
                            )
                        ) : (
                            <>
                                <View style={[styles.flexCenter, styles.distress]}>
                                    <TouchableOpacity
                                        onPress={() => this.broadcast()}
                                    >
                                        <View style={[styles.distressBtn, styles.flexCenter]}>
                                            <Icon name="exclamation" size={96} color="#ffffff" />
                                            <Text style={[styles.white, { fontWeight: "bold", fontSize: 24 }]}>Broadcast</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mapHold} />
                            </>
                        )
                    }
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
        zIndex: 3,
    },
    distressBtn: {
        backgroundColor: "#00499E",
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    white: {
        color: "#ffffff",
    },
    flexCenter: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    mapHold: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        zIndex: 1,
    },
    mapDimmer: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
      zIndex: 0,
    },
    yellow: {
        color: "#fcc201",
    },
    red: {
        color: "#FF0000",
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
});

export default DistressBroadcast;