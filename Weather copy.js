import React, { Component } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
	Button,
	ScrollView,
	ImageBackground,
	Dimensions
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const config = {
    skipPermissionRequests: false,
    authorizationLevel: "auto"
};

const { width, height } = Dimensions.get("screen");

// const weatherApiKey = "API_KEY";

// Climacell ApiKey
// const weatherApiKey = "CLymUmWVu481aL0lZaq8EWNu60rE3W1i";
// const apiURI = `https://api.climacell.co/v3/weather/realtime?unit_system=si&apikey=${weatherApiKey}&lon=${this.state.lon}&lat=${this.state.lat}`;

// Openweathermap ApiKey
const weatherApiKey = "ee84c1a1158ec4870a2594156ec0fddf";

// const apiURI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}";

class Weather extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lon: null,
			lat: null,
			data: {},
			isLoading: true
		};
	}
    
	_getLocal = () => {
		Geolocation.setRNConfiguration(config);
		Geolocation.getCurrentPosition(location => this.setState({ lon: location.coords.longitude, lat: location.coords.latitude } ));
	}

	componentDidMount() {
		this._getLocal();
	}

	_getWeather = () => {
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=${weatherApiKey}`)
		.then((response) => response.json())
		.then((json) => {
			this.setState({ data: json });
		})
		.catch((error) => console.error(error))
		.finally(() => {
			this.setState({ isLoading: false });
		});
	}

  render() {
    const { data, isLoading } = this.state;

    return (
		<>
			<ImageBackground
				source={require("./imgs/w-bg.png")}
				style={{ width: width, height: height }}
			>
				<View>
					{isLoading ? <ActivityIndicator/> : (
					//   <FlatList
					//     data={data}
					//     keyExtractor={({ id }, index) => id}
					//     renderItem={({ item }) => (
					//       <Text>{item.title}, {item.releaseYear}</Text>
					//     )}
					//   />
						<>
							{/* <Text>Lon: {JSON.stringify(this.state.lon)}</Text>
							<Text>Lat: {JSON.stringify(this.state.lat)}</Text> */}
							<ScrollView>
								<Text style={{ color: "white" }}>{JSON.stringify(data)}</Text>
							</ScrollView>
						</>
					)}
					<Button
						title="Get Weather Report"
						onPress={this._getWeather}
					/>
				</View>
			</ImageBackground>
		</>
    );
  }
};

export default Weather;