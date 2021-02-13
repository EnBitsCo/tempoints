import { Alert, Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import React from 'react';

import Status from './Status';
import MessageList from './MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from '../utils/MessageUtils';

export default class MessagingScreen extends React.Component {
    state = {
        messages: [
            createImageMessage('https://unsplash.it/300/300'),
            createTextMessage('World'),
            createTextMessage('Hello'),
            createLocationMessage({
                latitude: 37.78825,
                longitude: -122.4324,
            }),
        ],
        fullscreenImageId: null,
    };

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    handlePressMesage = ({ id, type }) => {
        switch (type) {
            case 'text':
                Alert.alert(
                    'Delete message?',
                    'Are you sure you want to permanently delete this message?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => {
                                const { messages } = this.state;
                                this.setState({ messages: messages.filter(message => message.id !== id ) });
                            },
                        },
                    ],
                );
                break;
            case 'image':
                this.setState({ fullscreenImageId: id });
                break;
            default:
                break;
        }
    };

    renderMessageList() {
        const { messages } = this.state;

        return (
            <View style={StyleSheet.content}>
                <MessageList messages={messages} onPressMessage={this.handlePressMesage} />
            </View>
        );
    }

    renderInputMethodEditor() {
        return (
            <View style={StyleSheet.inputMethodEditor}></View>
        );
    }

    renderToolbar() {
        return (
            <View style={StyleSheet.toolbar}></View>
        );
    }

    renderFullscreenImage = () => {
        const { messages, fullscreenImageId } = this.state;

        if(!fullscreenImageId) {
            return null;
        }

        const image = messages.find(message => message.id === fullscreenImageId);

        if(!image) {
            return null;
        }

        const { uri } = image;

        return (
            <TouchableHighlight style={styles.fullscreenOverly} onPress={this.dismissFullscreenImage}>
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        );
    };

    render() {
        return (
            <View style={StyleSheet.container}>
                <Status />
                {this.renderMessageList()}
                {this.renderToolbar()}
                {this.renderInputMethodEditor()}
                {this.renderFullscreenImage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputMethodEditor: {
        flex: 1,
        backgroundColor: 'white',
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
        backgroundColor: 'white',
    },
    fullscreenOverly: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        zIndex: 2,
    },
    fullscreenImage: {
        flex: 1,
        resizeMode: 'contain',
    },
});