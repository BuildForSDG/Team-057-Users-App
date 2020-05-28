import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import { Dialogflow_V2 as Dialogflow} from 'react-native-dialogflow';

import dialogflowConfig from './env'

// import { Sent, Recieved } from './Chats/index';

// import Messages from './Chats/Messages';

const { width, height } = Dimensions.get("screen");

const User = {
    _id: 1,
    name: 'Victor Momoh',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};

const BOT_USER = {
    _id: 2,
    name: 'FAQ Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};

class ChatBot extends React.Component {
    state = {
      messages: [
        {
          _id: 2,
          text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
          createdAt: new Date(),
          user: BOT_USER
        },
        {
          _id: 1,
          text: `Hi! I am Victor Momoh.`,
          createdAt: new Date(),
          user: User
        },
      ]
    };
  
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    
        let message = messages[0].text;

        Dialogflow.requestQuery(
            message,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }

    handleGoogleResponse(result) {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
    }
    
    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT_USER
        };
    
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
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
                        <GiftedChat
                            messages={this.state.messages}
                            onSend={messages => this.onSend(messages)}
                            user={User}
                        />
                    </View>

                    {/* <View>
                        <TextInput
                            placeholder="Type Something..."
                            style={{ paddingHorizontal: 10, }}
                            onChangeText={TextInputValue => this.setState({ message: TextInputValue}) }
                        />
                    </View> */}
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: width,
        height: height,
    },
    messages: {
        flex: 1,
        flexDirection: "column",
    },
})

export default ChatBot;