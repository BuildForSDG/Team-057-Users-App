import React, { useState } from 'react';
import { Text, TextInput, ScrollView, View, Dimensions, TouchableOpacity, Alert, Button } from "react-native";

import values from './common';

import Sent from './Sent';
import Recieved from './Recieved';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Voice from '@react-native-community/voice';

const { width, height } = Dimensions.get("screen");

let i = null;

const _showMessages = (message, user) => {
    return (
        <>
            { (message.user == user) ? _sent(message) : _recieved(message) }
        </>
    )
}

const _sent = (message) => {
    if (i === 0) {
        
        i = 0;

        return (
            <Sent message={message.text} createdAt={message.createdAt} break={true} />
        )
    }
    else {

        i = 0;

        return (
            <Sent message={message.text} createdAt={message.createdAt} break={false} />
        )
    }
}

const _recieved = (message) => {
    if (i === 1) {
        
        i = 1;

        return (
            <Recieved message={message.text} createdAt={message.createdAt} break={true} />
        )
    }
    else {

        i = 1;

        return (
            <Recieved message={message.text} createdAt={message.createdAt} break={false} />
        )
    }
}


class Chat extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mText: '',
        }

        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }
    
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechStart(e) {
        this.setState({
            started: '√',
        });
    };

    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });
    };

    onSpeechResults(e) {

        const mText = e.value[0];

        this.setState({mText});

        this._send();
    }
    
    async _startRecognition(e) {
        this.setState({
            recognized: '',
            started: '',
            results: [],
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    _send = () => {
        let { mText }  = this.state ;

        if (mText) {
            let message = {
                text: mText,
                createdAt: new Date(),
                user: this.props.user
            };
    
            mText = '';
    
            this.textInput.clear();
            this.setState({mText})
    
    
            this.props.onSend(message);
        }

    }  

    _listen = () => {
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    render = () => {
        return (
            <>
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {this.props.messages.map(message => _showMessages(message, this.props.user))}  
                </ScrollView> 
                <View>
                    <View style={{flex:0, flexDirection: "row", alignItems: "center",}}>
                        <View style={{ width: "auto", marginHorizontal: 4, }}>
                            <Button title="speak" onPress={this._startRecognition.bind(this)} />
                        </View>
                        <View style={{ width: width - 120 }}>
                            <TextInput placeholder="Type something..." multiline onChangeText={mText => this.setState({mText})} ref={ref => {this.textInput = ref}} />
                        </View>
                        <View style={{ width: "auto", marginHorizontal: 4, }}>
                            <Button title="send" onPress={this._send} />
                        </View>
                    </View>
                </View>
            </>
    
        )
    }

}

export default Chat;