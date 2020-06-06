import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import Chat from './Chat';

import { Dialogflow_V2 as Dialogflow} from 'react-native-dialogflow';

import dialogflowConfig from './env'
import reactNativeTts from 'react-native-tts';

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
    state = {
        messages: [
            {
<<<<<<< HEAD
                text: `Hi! I am the your Road Assistant Bot.\nHow may I help you with today?`,
=======
                text: `Hi! I am your Road Assistant Bot.\n\nHow may I help you with today?`,
>>>>>>> ft_map
                createdAt: new Date(),
                user: BOT
            },
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
            let text = msg.text.text[0];
            this.sendBotResponse(text);
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
    
    
    componentDidMount() {
        Dialogflow.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );
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
        backgroundColor: "#EDEDED",
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