import React from 'react';
import { 
    StyleSheet,
 } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
            region: {
                longitude: 0,
                latitude: 0,
                longitudeDelta: 0.001,
                latitudeDelta: 0.001
            },
        }
    }
    
    _getLocal = () => {
        Geolocation.setRNConfiguration(config);
        // Geolocation.getCurrentPosition(location => this.setState({ region: { longitude: location.coords.longitude, latitude: location.coords.latitude, longitudeDelta: 0.001, latitudeDelta: 0.001 } }));
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render () {
        return (
            <>
                {this._getLocal()}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    customMapStyle={mapStyle.aubergine}
                />
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