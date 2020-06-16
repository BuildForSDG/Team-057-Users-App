import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import DisressBroadcast from './DistressBroadcast';
import RoadTips from './RoadTips';

const { width, height } = Dimensions.get("screen");

const Option = (props) => {
	return (
		<TouchableOpacity
			style={{
				margin: 10,
			}}
			onPress={props.action}
		>
			<View style={[styles.card, { ...styles.item, backgroundColor: "#ffffff" }]}>
				<Icon name={props.icon} size={72} color={props.color} solid />
				<Text style={{ color: props.color, fontSize: 16, fontWeight: "100", margin: 5, }}>{props.name}</Text>
			</View>
		</TouchableOpacity>
	)
};

class App extends React.Component {
	constructor (props) {
		super(props);
	}

	state = {
		home: true,
		roadTipsVisibility: false,
	}

	backAction = () => {

		if (!this.state.home) {
			return this.refs.swiper.scrollBy(1);
		}
		
	}
	
	componentDidMount() {
		this.backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			this.backAction
		);
	}
	
	componentWillUnmount() {
		this.backHandler.remove();
	}

	nav (goto) {
		Navigation.push(this.props.componentId, {
			component: {
				name: goto,
				options: {
					topBar: {
						title: {
							text: goto
						}
					}
				}
			}
		})
	}

    showRoadTips = () => {
		let { roadTipsVisibility }  = this.state;
		
		roadTipsVisibility = true;

		this.setState({roadTipsVisibility});

    }

    closeRoadTips = () => {
		let { roadTipsVisibility }  = this.state;
		
		roadTipsVisibility = false;

		this.setState({roadTipsVisibility});

	}


	render () {
		return (
			<>
				<StatusBar backgroundColor={ (this.state.home) ? "#014290" : "#000000" }/>
				<RoadTips visible={this.state.roadTipsVisibility} onClose={this.closeRoadTips} />
				<Swiper ref='swiper' style={styles.wrapper} showsPagination={false} bounces={true} loop={false} index={1} onIndexChanged={() => this.setState({home: !this.state.home})}>
					<SafeAreaView>
						<View>
							<DisressBroadcast
								componentId={this.props.componentId}
							/>
						</View>
					</SafeAreaView>
					<SafeAreaView
							style={styles.container}
					>
						
						<ScrollView
							contentInsetAdjustmentBehavior="automatic" 
						>
							{/* <Image source={require("./imgs/vect.png")} style={styles.topBg} /> */}

							<ImageBackground
								source={require("./imgs/homeBg.png")}
								style={styles.HomeBg}
								imageStyle={{
									flex: 1,
									resizeMode: "cover",
									justifyContent: "center"
								}}
							>

								<Text style={styles.appName}>Road Assistant</Text>

								<View style={styles.items}>
									
									<Option
										action={() => this.nav("TTS")}
										name="My Locations"
										icon="map-pin"
										color="#bc49ff"
									/>
									
		
									<Option
										action={() => this.nav("VoiceRecognition")}
										name="Reminders"
										icon="stopwatch"
										color="#FE5B92"
									/>
		
									<Option
										action={() => this.nav("Weather")}
										name="Weather Reports"
										icon="cloud"
										color="#bc49ff"
									/>
		
									<Option
										action={() => this.nav("Weather")}
										name="My Profile"
										icon="user"
										color="#581bfe"
									/>
		
									<Option
										action={() => this.nav("Chatbot")}
										name="Report Poor Road"
										icon="road"
										color="#fe5b92"
									/>
		
									<Option
										action={() => this.nav("DisressBroadcast")}
										name="Road Companion"
										icon="directions"
										color="#FF5A3E"
									/>
		
									<Option
										action={this.showRoadTips}
										name="Road Tips"
										icon="info-circle"
										color="#53cbff"
									/>
		
									<Option
										action={() => this.nav("Map")}
										name="Insurance"
										icon="user-injured"
										color="#fe8e38"
									/>
								</View>
	
							</ImageBackground>
	
						</ScrollView>
					</SafeAreaView>
				</Swiper>
				<View style={ (this.state.home) ? (styles.floatingBtns) : ({ display: "none"}) }>
					<TouchableOpacity style={styles.floatingBtn} onPress={() => this.refs.swiper.scrollBy(-1)}>
						<View>
							<Icon name="broadcast-tower" size={24} color="#FFFFFF" solid />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.floatingBtn} onPress={() => this.nav("Chatbot")}>
						<View>
							<Icon name="robot" size={24} color="#FFFFFF" solid />
						</View>
					</TouchableOpacity>
				</View>
			</>
		);
	}

};

const styles = StyleSheet.create({
	appName: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#ffffff",
		marginHorizontal: 25,
		marginTop: 40,

	},
	HomeBg: {
		width: "100%",

	},
	card: {
		width: (width - 20 * 3) / 2,
		height: (width - 20 * 3) / 2,
		borderRadius: 10,
	},
	items: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		paddingTop: 20,
		paddingHorizontal: 10,
		paddingBottom: 80,
	},
	item: {
		justifyContent: "center",
		alignItems: "center",
	},
	floatingBtns: {
		position: 'absolute',
		flex: 0,
		flexDirection: "row",
		justifyContent: 'center',
		bottom: 0,
		width: width,
	},
	floatingBtn: {
		flex: 0,
		width: 64,
		height: 64,
		backgroundColor: "#0075FF",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 64,
	},
});

export default App;
