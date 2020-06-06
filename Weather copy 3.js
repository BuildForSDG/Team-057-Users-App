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
	TouchableOpacity
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
									<Text style={styles.placeState}>Sofia,&nbsp;</Text>
									<Text style={styles.placeCountry}>Bulgaria</Text>
								</View>
								<View>
									<Text style={styles.time}>Monday, 6 May 2019</Text>
								</View>
							</View>
							<View style={styles.tempSect}>
								<Text style={styles.tempNo}>16</Text><Text style={styles.tempUnit}>oC</Text>
							</View>
							<View style={styles.subTempSect}>
								<Text style={styles.subTempText}>RealFeel 21o</Text>
								<Text style={styles.subTempText}>Precipitation 65%</Text>
							</View>
						</View>
						<View style={styles.topRightSect}>
							<View style={styles.subTempOthers}>
								<Text style={styles.subTempValue}>10km/h</Text>
								<Text style={styles.subTempTitle}>Wind</Text>
							</View>
							<View style={styles.subTempOthers}>
								<Text style={styles.subTempValue}>6 mm</Text>
								<Text style={styles.subTempTitle}>Rain</Text>
							</View>
							<View style={styles.subTempOthers}>
								<Text style={styles.subTempValue}>40%</Text>
								<Text style={styles.subTempTitle}>Thunderstorm</Text>
							</View>
						</View>
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
						<Button
							title="Get Weather Report"
							onPress={() => this._getWeather}
						/>
						<Text style={{ color: "white" }}>{this.state.lon}</Text>
						<Text style={{ color: "white" }}>{this.state.lat}</Text>
						<Text style={{ color: "white" }}>{JSON.stringify(data)}</Text>
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
	},
	placeNameHolder: {
		flex: 0,
		flexDirection: "row",
		alignItems: "baseline",
	},
	placeState: {
		color: "#FA6D31",
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
		backgroundColor: "#FA6D31",
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