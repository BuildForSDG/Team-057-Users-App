import React from 'react';
import Chat from './Chat';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

const User = {
    id: 1,
    name: 'Victor Momoh',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};

const BOT = {
    id: 2,
    name: 'FAQ Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};


class SignUp extends React.Component {
    constructor (props) {
        super(props);
    }

    state = {
        messages: [
            {
                text: `What is your name please?`,
                createdAt: new Date(),
                user: BOT
            },
        ],
    };

    render = () => {
        return (
            <Chat
                messages={this.state.messages}
        )
    }
}