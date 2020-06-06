import React, { useState } from 'react';
import { Text, TextInput, ScrollView, View, Dimensions, TouchableOpacity, StyleSheet, Keyboard } from "react-native";

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
            displayInput: false,
        }

        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }
    componentDidMount() {
        // this.keyboardDidShowListener = Keyboard.addListener(
        //     'keyboardDidShow',
        //     this._keyboardDidShow,
        // );
    }
    
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
        // this.keyboardDidShowListener.remove();
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

    _showInput = () => {
        this.textInput.focus();

        let displayInput = true;
        this.setState({ displayInput });

        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._hideInput,
        );
    }

    _hideInput = () => {
        // this.textInput.focus();
        this.keyboardDidHideListener.remove();

        let displayInput = false;
        this.setState({ displayInput });
    }

    _listen = () => {
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    render = () => {
        const { displayInput } = this.state;
        return (
            <>
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {this.props.messages.map(message => _showMessages(message, this.props.user))}  
                </ScrollView> 
                <View>
                    <View style={{width: width, flex:0, flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 8, }}>
                        <View style={displayInput ? {...styles.inputView} : { display: "none" } } ref={ref => {this.inputView = ref}}>
                            <TextInput placeholder="Type something..." multiline style={{ width: width - 84, marginLeft: 8, fontSize: 20}} onChangeText={mText => this.setState({mText})} ref={ref => {this.textInput = ref}} onBlur={this._hideInput} />
                            <TouchableOpacity
                                onPress={this._send}
                            >
                                <View style={styles.btns}>
                                    <Icon
                                        name="send"
                                        color="#ffffff"
                                        size={24}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={ (!displayInput) ? {...styles.options} : { display: "none" } }>
                            <View style={{ width: "auto", marginHorizontal: 4, }}>
                                <TouchableOpacity
                                    onPress={this._startRecognition.bind(this)}
                                >
                                    <View style={styles.btns}>
                                        <Icon
                                            name="mic"
                                            color="#ffffff"
                                            size={24}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "auto", marginHorizontal: 4, }}>
                                <TouchableOpacity
                                    onPress={this._showInput}
                                >
                                    <View style={styles.btns}>
                                        <Icon
                                            name="keyboard"
                                            color="#ffffff"
                                            size={24}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </>
    
        )
    }

}

const styles = StyleSheet.create({
    btns: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A6294B",
        height: 48,
        width: 48,
        borderRadius: 48,
    },
    sendBtn: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A6294B",
        height: 36,
        width: 36,
        borderRadius: 48,
    },
    options: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        // borderColor: "#444",
        // borderStyle: "solid",
        backgroundColor: "#ffffff",
        // borderWidth: 1,
        borderRadius: 60,
    },
    optionsHidden: {
        display: "none",
    },
    inputView: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: 4,
        borderRadius: 60,
    }
})

export default Chat;