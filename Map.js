import React from 'react';
import { 
    StyleSheet,
 } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import mapStyle from './mapStyle';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';

const config = {
    skipPermissionRequests: false,
    authorizationLevel: "auto"
};

// Geolocation.setRNConfiguration(config);

// Geolocation.requestAuthorization();

class Map extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            region: this.initialRegion,
            markers: [
                {
                    latlng: {},
                    title: "You",
                    description: "This is where you are...",
                }
            ]
        }

        Geolocation.setRNConfiguration(config);
        Geolocation.getCurrentPosition(location => {
            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }
            });

            this.setState({
                markers: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }
            });
        });
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render () {
        return (
            <>
                {/* {this._getLocal()} */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={() => this.onRegionChange()}
                    customMapStyle={mapStyle.standard}
                >
                    {/* {
                        this.state.markers.map(marker => ( */}
                            <Marker
                            coordinate={this.state.region}
                            title="You"
                            description="Where I am..."
                            />
                        {/* ))
                    } */}
                </MapView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
    },
});

export default Map;