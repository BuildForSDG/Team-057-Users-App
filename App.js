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

const { width, height } = Dimensions.get("screen");

const Option = (props) => {
	return (
		<TouchableOpacity
			style={{
				margin: 10,
			}}
			onPress={() => Navigation.push(props.componentId, {
				component: {
					name: props.goto,
					options: {
					topBar: {
						title: {
						text: props.goto
						}
					}
					}
				}
			})} 
		>
			<View style={[styles.card, { ...styles.item, backgroundColor: props.background }]}>
				<Icon name={props.icon} size={36} color="#ffffff" />
				<Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold" }}>{props.name}</Text>
			</View>
		</TouchableOpacity>
	)
}

const App = (props) => {
  return (
    <>			
		<Swiper style={styles.wrapper} showsPagination={false} bounces={true} loop={false} index={1}>
			<SafeAreaView>
				<View>
					<DisressBroadcast
						componentId={props.componentId}
					 />
				</View>
			</SafeAreaView>
			<SafeAreaView>
				
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
				>

					<View style={styles.items}>
						<Option
							componentId={props.componentId}
							name="Text To Speech"
							icon="phonelink-ring"
							goto="TTS"
							background="#581bfe"
						/>

						<Option
							componentId={props.componentId}
							name="Voice Recognition"
							icon="mic"
							goto="VoiceRecognition"
							background="#fe8e38"
						/>

						<Option
							componentId={props.componentId}
							name="Weather Report"
							icon="filter-drama"
							goto="VoiceRecognition"
							background="#bc49ff"
						/>

						<Option
							componentId={props.componentId}
							name="Report"
							icon="report"
							goto="Chatbot"
							background="#fe5b92"
						/>

						<Option
							componentId={props.componentId}
							name="Distress Broadcast"
							icon="speaker-phone"
							goto="DisressBroadcast"
							background="#FF5A3E"
						/>

						<Option
							componentId={props.componentId}
							name="Road Tips"
							icon="directions"
							goto="PopUp"
							background="#53cbff"
						/>

						<Option
							componentId={props.componentId}
							name="Map"
							icon="map"
							goto="Map"
							background="#fe8e38"
						/>

						<Option
							componentId={props.componentId}
							name="Notifications"
							icon="notifications"
							goto="Notifications"
							background="#bc49ff"
						/>
					</View>

				</ScrollView>
			</SafeAreaView>
		</Swiper>
    </>
  );
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
