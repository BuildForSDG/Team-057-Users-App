import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
	Button,
	ScrollView,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';
// import AsyncStorage from "@react-native-community/async-storage";
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import API_KEYS from './apiKeys';
import { getData, storeData } from './Storage';

const config = {
    skipPermissionRequests: false,
    authorizationLevel: "auto"
};

// const weatherReport = await getData('@weather-report');
// const weatherLastUpdated = await getData('@weather-last-updated');

// const weatherData = JSON.parse(weatherReport);

// if (weatherLastUpdated < Date.now()) {
	
// }

const { width, height } = Dimensions.get("screen");

// Climacell ApiKey
// const apiURI = `https://api.climacell.co/v3/weather/realtime?unit_system=si&apikey=${weatherApiKey}&lon=${this.state.lon}&lat=${this.state.lat}`;

const weatherApiKey = API_KEYS.OPEN_WEATHER_MAP_API_KEY;
const googleApiKey = API_KEYS.GOOGLE_MAPS_API_KEY;
const climacellApiKey = API_KEYS.CLIMA_CELL_API_KEY;

// const apiURI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}";

class Weather extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lon: null,
			lat: null,
			data: {},
			place: {},
			isLoading: true
		};
	
		this.place = {
			lga: "Loading...",
			state: "Loading",
		};

		this.time = new Date(Date.now());
		this.temp = 273.15;
		this.feel = 273.15;
		this.wind = 0;
		this.main = "Loading...";
		this.clouds = 0;
		this.precipitation = 0;
		this.hourly = [];
		
	}

	mnts = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	days = [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	];

	getHour = (time) => {
		let date = new Date(time * 1000);

		let hour = date.getHours();

		if (hour == 0) {
			hour = "12:00 AM";
		}
		else if (hour > 12) {
			hour = hour - 12 + ":00 PM";
		}
		else {
			hour = hour + ":00 AM";
		}

		return hour;
	}

	showHour = (index) => {
		console.log(index);
	}
    
	_getLocal = () => {
		Geolocation.setRNConfiguration(config);
		Geolocation.getCurrentPosition(location => this.setState({ lon: location.coords.longitude, lat: location.coords.latitude } ));
	}

	componentDidMount() {
		this._getLocal();
	}

	componentDidUpdate() {
		this._getWeather();
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
	
			this.place = this.state.data.timezone;
			this.time = new Date(this.state.data.current.dt * 1000);
			this.temp = this.state.data.current.temp;
			this.feel = this.state.data.current.feels_like;
			this.wind = this.state.data.current.wind_speed;
			this.main = this.state.data.current.weather[0].main;
			this.clouds = this.state.data.current.clouds;
			this.precipitation = this.state.data.current.rain;
			this.icon = this.state.data.current.weather[0].icon;

			this.hourly = this.state.data.hourly;

			// this._getPlace();
		});
	}

	_getPlace = () => {
		// fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleApiKey}&input=LGA&inputtype=textquery&fields=name&locationbias=point:${this.state.lat},${this.state.lon}`)
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lon}&key=${googleApiKey}`)
		.then((response) => response.json())
		.then((json) => {
			this.setState({ place: json });
		})
		.catch((error) => console.error(error))
		.finally(() => {
			this.place = this.state.place.results[0].address_components.map((names, index) => {
				if (names.types[0] == "administrative_area_level_2") {
					this.place.lga = names.long_name;
				}
				else if (names.types[0] == "administrative_area_level_1") {
					this.place.state = names.long_name;
				}
			});
		});
	}

  render() {
	const { data } = this.state;

    return (
		<>
			<ImageBackground
				source={require("./imgs/w-bg.png")}
				style={{ width: width, height: height }}
			>
				<ScrollView>
					<View style={styles.top}>
						<View style={styles.topLeftSect}>
							<View style={styles.placeSect}>
								<View style={styles.placeNameHolder}>
									<Text style={styles.placeState}>{this.place.lga},&nbsp;</Text>
									<Text style={styles.placeCountry}>{this.place.state}</Text>
								</View>
								<View>
									<Text style={styles.time}>{this.days[this.time.getDay()]}, {this.time.getDate()} {this.mnts[this.time.getMonth()]} {this.time.getFullYear()}</Text>
								</View>
							</View>
							<View style={styles.tempSect}>
								<Text style={styles.tempNo}>{this.temp - 273.15}</Text><Text style={styles.tempUnit}>oC</Text>
							</View>
							<View style={styles.subTempSect}>
								<Text style={styles.subTempText}>Real Feel 21o</Text>
								{(this.precipitation) ? <Text style={styles.subTempText}>Precipitation {this.precipitation} %</Text> : <Text style={styles.subTempText}></Text> }
							</View>
						</View>
						<View style={styles.topRightSect}>
							<View style={styles.subTempOthers}>
								<Text style={styles.subTempValue}>{this.wind}km/h</Text>
								<Text style={styles.subTempTitle}>Wind</Text>
							</View>
							{(this.precipitation) ? 
							(
								<View style={styles.subTempOthers}>
									<Text style={styles.subTempValue}>{this.precipitation} mm</Text>
									<Text style={styles.subTempTitle}>{this.main}</Text>
								</View>
							) : <View /> }

							
							{(this.clouds) ? 
							(
								<View style={styles.subTempOthers}>
									<Text style={styles.subTempValue}>{this.clouds}%</Text>
									<Text style={styles.subTempTitle}>{this.main}</Text>
								</View>
							) : <View /> }
							
						</View>
					</View>
					<View style={styles.center}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							{this.hourly.map((hour, index) => (index == 0) ? 
								<TouchableOpacity onPress={() => this.showHour(index)}>
									<View style={[styles.tempCard, styles.now]}>
										{/* <Icon name="cloud-showers-heavy" color="#FFFFFF" size={36} /> */}
										<Image source={{ uri: `http://openweathermap.org/img/wn/${this.icon}@2x.png`, }} style={{ width: 36, height: 36, }} />
										<Text style={styles.tempCardText}>Now</Text>
									</View>
								</TouchableOpacity>
								:
								<TouchableOpacity onPress={() => this.showHour(index)}>
									<View style={styles.tempCard}>
										{/* <Icon name="cloud-showers-heavy" color="#FFFFFF" size={36} /> */}
										<Image source={{ uri: `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`, }} style={{ width: 36, height: 36, }} />
										<Text style={styles.tempCardText}>{this.getHour(hour.dt)}</Text>
									</View>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
					<View style={styles.list}>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View style={styles.listCard}>
								<View>
									<Text style={styles.listCardPlace}>Sofia</Text>
									<Text style={styles.listCardTime}>4:00 AM</Text>
								</View>
								<View>
									<Icon name="cloud-showers-heavy" size={48} color="#FFFFFF" />
								</View>
								<View>
									<Text style={styles.listCardTemp}>16o</Text>
								</View>
							</View>
						</TouchableOpacity>
						{/* <Button
							title="Get Weather Report"
							onPress={() => this._getWeather}
						/> */}
						{/* <Text style={{ color: "white" }}>{this.state.lon}</Text> */}
						{/* <Text style={{ color: "white" }}>{this.state.lat}</Text> */}
						{/* <Text style={{ color: "white" }}>{JSON.stringify(data)}</Text> */}
					</View>
				</ScrollView>
			</ImageBackground>
		</>
    );
  }
};

const styles = StyleSheet.create({
	top: {
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	topLeftSect: {
		padding: 20,
	},
	topRightSect: {
		padding: 20,
		flex: 0,
		flexDirection: "column",
		justifyContent: "space-around",
	},
	placeSect: {
		paddingVertical: 5,
	},
	tempSect: {
		flex: 0,
		flexDirection: "row",
		alignItems: "flex-end",
		paddingVertical: 5,
	},
	subTempSect: {
		paddingVertical: 5,
	},
	tempNo: {
		color: "#FFFFFF",
		fontSize: 72,
		fontWeight: "bold",
		marginVertical: 0,
	},
	tempUnit: {
		color: "#FFFFFF",
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 15,
	},
	subTempText: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	subTempOthers: {
		flex: 0,
		flexDirection: "column",
		justifyContent: "flex-end",
	},
	subTempValue: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "right",
	},
	subTempTitle: {
		color: "#C6C6C6",
		fontSize: 12,
		textAlign: "right",
		textTransform: "uppercase",
	},
	placeNameHolder: {
		flex: 0,
		flexDirection: "row",
		alignItems: "baseline",
	},
	placeState: {
		color: "#0075FF",
		fontWeight: "100",
		fontSize: 36,
	},
	placeCountry: {
		color: "#FFFFFF",
		fontSize: 24,
		paddingBottom: 4,
	},
	time: {
		color: "#C6C6C6",
		fontSize: 16,
	},

	// Center
	center: {
		flex: 0,
		flexDirection: "row",
	},
	tempCard: {
		padding: 30,
		flex: 0,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	now: {
		backgroundColor: "#0075FF",
		borderTopRightRadius: 60,
		borderBottomRightRadius: 60,
	},
	tempCardText: {
		color: "#FFFFFF",
		fontSize: 14,
	},

	// Bottom
	bottom: {
		paddingVertical: 20,
	},
	tempInfo: {
		flex: 0,
		flexDirection: "row",
	},
	tempInfoIcon: {
		padding: 20,
	},
	tempInfoValue: {
		color: "#FFFFFF",
		fontSize: 16,
		paddingTop: 20,
	},
	tempInfoTitle: {
		color: "#C6C6C6",
		fontSize: 12,
		paddingBottom: 20,
	},

	// List
	list: {
		paddingTop: 20,
		paddingBottom: 100,
	},
	listCard: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 8,
		marginHorizontal: 20,
		marginVertical: 10,
		padding: 20,
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	listCardPlace: {
		fontSize: 32,
		color: "#FFFFFF",
	},
	listCardTime: {
		fontSize: 14,
		color: "#FFFFFF",
	},
	listCardTemp: {
		fontSize: 48,
		color: "#FFFFFF",
	},
});

export default Weather;