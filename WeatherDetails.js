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

class WeatherDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {},
			isLoading: true
		};
	}

	mnts = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	days = [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	];

	componentDidMount() {
		this._getWeather();
	}

	_getWeather = () => {
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.lat}&lon=${this.props.lon}&appid=${weatherApiKey}`)
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
				{/* <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
					<Icon name="arrow-left" size={36} color="#ffffff" />
				</View> */}
				<ScrollView>
					<View style={styles.top}>
						<View style={styles.topLeftSect}>
							<View style={styles.placeSect}>
								<View style={styles.placeNameHolder}>
									<Text style={styles.placeState}>Sofia,&nbsp;</Text>
									<Text style={styles.placeCountry}>Bulgaria</Text>
								</View>
								<View>
									<Text style={styles.time}>{this.days[this.time.getDay()]}, {this.time.getDate()} {this.mnts[this.time.getMonth()]} {this.time.getFullYear()}</Text>
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
					<View style={styles.center}>
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							<TouchableOpacity>
								<View style={[styles.tempCard, styles.now]}>
									<Icon name="cloud-showers-heavy" color="#FFFFFF" size={36} />
									<Text style={styles.tempCardText}>Now</Text>
								</View>
							</TouchableOpacity>
							{this.hourly.map(hour => {
								<TouchableOpacity>
									<View style={styles.tempCard}>
										<Icon name="cloud-showers-heavy" color="#FFFFFF" size={36} />
										<Text style={styles.tempCardText}>1:00 AM</Text>
									</View>
								</TouchableOpacity>
							})}
						</ScrollView>
					</View>
					<View style={styles.bottom}>
						<View style={styles.tempInfo}>
							<View style={styles.tempInfoIcon}>
								<Icon name="temperature-high" color="#C6C6C6" size={24} />
							</View>
							<View>
								<Text style={styles.tempInfoValue}>10oC</Text>
								<Text style={styles.tempInfoTitle}>Temperature</Text>
							</View>
						</View>
						<View style={styles.tempInfo}>
							<View style={styles.tempInfoIcon}>
								<Icon name="wind" color="#C6C6C6" size={24} />
							</View>
							<View>
								<Text style={styles.tempInfoValue}>15 km/h</Text>
								<Text style={styles.tempInfoTitle}>Wind speed</Text>
							</View>
						</View>
						<View style={styles.tempInfo}>
							<View style={styles.tempInfoIcon}>
								<Icon name="tint" color="#C6C6C6" size={24} />
							</View>
							<View>
								<Text style={styles.tempInfoValue}>20mm</Text>
								<Text style={styles.tempInfoTitle}>Rain</Text>
							</View>
						</View>
						<View style={styles.tempInfo}>
							<View style={styles.tempInfoIcon}>
								<Icon name="eye" color="#C6C6C6" size={24} />
							</View>
							<View>
								<Text style={styles.tempInfoValue}>5.5km</Text>
								<Text style={styles.tempInfoTitle}>Visibility</Text>
							</View>
						</View>
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
});

export default WeatherDetails;