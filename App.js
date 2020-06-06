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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
			<View style={[styles.card, { ...styles.item, backgroundColor: props.background }]}>
				<Icon name={props.icon} size={36} color="#ffffff" />
				<Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}>{props.name}</Text>
			</View>
		</TouchableOpacity>
	)
};

class App extends React.Component {
	constructor (props) {
		super(props);
	}

	state = {
		roadTipsVisibility: false,
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
				<RoadTips visible={this.state.roadTipsVisibility} onClose={this.closeRoadTips} />
				<Swiper style={styles.wrapper} showsPagination={false} bounces={true} loop={false} index={1}>
					<SafeAreaView>
						<View>
							<DisressBroadcast
								componentId={this.props.componentId}
							/>
						</View>
					</SafeAreaView>
					<SafeAreaView>
						
						<ScrollView
							contentInsetAdjustmentBehavior="automatic"
						>
	
							<View style={styles.items}>
								<Option
									action={() => this.nav("TTS")}
									name="Text To Speech"
									icon="phonelink-ring"
									background="#581bfe"
								/>
	
								<Option
									action={() => this.nav("VoiceRecognition")}
									name="Voice Recognition"
									icon="mic"
									background="#fe8e38"
								/>
	
								<Option
									action={() => this.nav("Weather")}
									name="Weather Report"
									icon="filter-drama"
									background="#bc49ff"
								/>
	
								<Option
									action={() => this.nav("Chatbot")}
									name="Report"
									icon="report"
									background="#fe5b92"
								/>
	
								<Option
									action={() => this.nav("DisressBroadcast")}
									name="Distress Broadcast"
									icon="speaker-phone"
									background="#FF5A3E"
								/>
	
								<Option
									action={this.showRoadTips}
									name="Road Tips"
									icon="directions"
									background="#53cbff"
								/>
	
								<Option
									action={() => this.nav("Map")}
									name="Map"
									icon="map"
									background="#fe8e38"
								/>
	
								<Option
									action={() => this.nav("Notifications")}
									name="Notifications"
									icon="notifications"
									background="#bc49ff"
								/>
							</View>
	
						</ScrollView>
					</SafeAreaView>
				</Swiper>
			</>
		);
	}

};

const styles = StyleSheet.create({
	card: {
		width: (width - 20 * 3) / 2,
		height: (width - 20 * 3) / 2,
		borderRadius: 10,
		shadowColor: "#fefefe22",
		shadowOffset: {
			width: 200,
			height: 200,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 10,
	},
	items: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		paddingVertical: 40,
		paddingHorizontal: 10,
		backgroundColor: "#f9fbfd"
	},
	item: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default App;
