import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import { Dialogflow_V2 as Dialogflow} from 'react-native-dialogflow';
import reactNativeTts from 'react-native-tts';

import dialogflowConfig from './env'

import { getData, storeData } from './Storage';
import Chat from './Chat';

const { width, height } = Dimensions.get("screen");

const User = {
    id: 1,
    name: 'Victor Momoh',
};

const BOT = {
    id: 2,
    name: 'Road Assistant Bot',
};

class ChatBot extends React.Component {
    constructor (props) {
        super(props);

        // console.log(JSON.parse('{"data":{"User ID":"USR15916436765EDE8E1C457E5","Email":"momohvictor62@gmail.com","Token":"efdb9b6f940848f709f33e96d486c572"}}'));
    }

    state = {
        messages: [
        ],
    };
  
    onSend(message) {
        
        const { messages }  = this.state ;

        messages.push(message);

        this.setState({messages});
    
        let sendText = message.text;

        Dialogflow.requestQuery(
            sendText,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }

    handleGoogleResponse(result) {
        let arrayMsg = result.queryResult.fulfillmentMessages;

        arrayMsg.forEach(msg => {

            let msgData = msg.text.text[0];

            let code = "~~$user->user_id|$user->email|$user->token";

            if (msgData.search("~~") != -1) {

                let data = msgData.replace("~~", "");

                data = data.split("|");

                console.log(typeof data);

                console.log(data);
                
                this.recievedData(data);
            } else {
                this.sendBotResponse(msgData);
            }

        });
    }
    
    sendBotResponse(text) {
        let message = {
            text,
            createdAt: new Date(),
            user: BOT
        };
        
        const { messages }  = this.state ;

        messages.push(message);

        this.setState({messages});

        
        reactNativeTts.setDucking(true);

        reactNativeTts.setDefaultPitch(1);

        reactNativeTts.getInitStatus().then(() => {
            reactNativeTts.speak(text);
        });
    }

    async initDialogflow () {
        await Dialogflow.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );
    }

    async initOnboarding () {

        await this.initDialogflow().then(
            setTimeout(() => {
                Dialogflow.requestQuery(
                    "Onboard me",
                    result => this.handleGoogleResponse(result),
                    error => console.log(error)
                )
            }, 1000)
        );

    }

    recievedData (data) {

		fetch(`https://backend-057.herokuapp.com/api/${data[0]}/${data[2]}/profile`)
		.then((response) => {console.log(response); return response.json()})
		.then((json) => {

            console.log(json);

            if (json.success) {
                storeData('@user_data', {
                    ...json.data,
                    token: data[2],
                    signedIn: true,
                });

                if (json.data["First Name"] && json.data["Last Name"]) {
                    this.completed();
                }
                else {
                    this.getUserData();
                }
            }
            else {
            }
		})
        .catch((error) => { console.error(error) });
        
    }

    complete () {
        Navigation.push(this.props.componentId, {
            component: {
                name: "WelcomeScreen",
                options: {
                    topBar: {
                        title: {
                            text: "WelcomeScreen"
                        }
                    }
                }
            }
        });
    }

    getUserData () {
        Dialogflow.requestQuery(
            "Update my info.",
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }
    
    componentDidMount() {

        this.sendBotResponse("Hi! I am your Road Assistant Bot.");

        this.sendBotResponse("I will be helping you set up your account.");
        
        this.initOnboarding();

    }

    render () {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.messages}>
                        <Chat
                            messages={this.state.messages}
                            onSend={messages => this.onSend(messages)}
                            user={User}
                        />
                    </View>
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f7ff",
        // backgroundColor: "#ffffff",
        width: width,
        height: height,
    },
    messages: {
        backgroundColor: "#00000000",
        flex: 1,
        flexDirection: "column",
    },

    
    msgHolderS: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    msgHolderR: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    message: {
        width: "auto",
        height: 34,
        padding: 10,
        marginTop: 5,
        marginHorizontal: 10,
    },
    messageS: {
        backgroundColor: "#5579f1",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    messageR: {
        backgroundColor: "#f3f6ff",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    break: {
        marginBottom: 5,
    },
    noBreak: {
        marginBottom: 0,
    },
    msgTextS: {
        color: "#ffffff",
        fontSize: 14,
    },
    msgTextR: {
        color: "#536185",
        fontSize: 14,
    },
    msgTimeS: {
        color: "#ffffff",
        fontSize: 8,
        fontWeight: "bold",
    },
    msgTimeR: {
        color: "#536185",
        fontSize: 8,
        fontWeight: "bold",
    },
})

export default ChatBot;