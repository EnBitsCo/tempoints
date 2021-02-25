import {
    Alert,
    Image,
    StyleSheet,
    TouchableHighlight,
    View,
    BackHandler,
} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';

import Status from './Status';
import MessageList from './MessageList';
import Toolbar from './Toolbar';
import ImageGrid from './ImageGrid';
import KeyboardState from './KeyboardState';
import MeasureLayout from './MeasureLayout';
import MessagingContainer, { INPUT_METHOD } from './MessagingContainer';

import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

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
        isInputFocused: false,
        inputMethod: INPUT_METHOD.NONE,
    };

    componentDidMount() {
        this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            const { fullscreenImageId } = this.state;

            if(fullscreenImageId) {
                this.dismissFullscreenImage();
                return true;
            }

            return false;
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

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
                this.setState({ fullscreenImageId: id, isInputFocused: false });
                break;
            default:
                break;
        }
    };

    handlePressToolbarCamera = () => {
        this.setState({
            isInputFocused: false,
            inputMethod: INPUT_METHOD.CUSTOM,
        });
    };

    handlePressToolbarLocation = () => {
        const { messages } = this.state;

        //navigator.geolocation.getCurrentPosition((position) => {
        Geolocation.getCurrentPosition((position) => {
            const { coords: { latitude, longitude } } = position;
            console.log('Position: ', JSON.stringify(position));
            this.setState({
                messages: [
                    createLocationMessage({
                        latitude,
                        longitude,
                    }),
                    ...messages,
                ],
            });
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {
            enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        });
    };

    handlePressImage = (uri) => {
        const { messages } = this.state;

        this.setState({
            messages: [createImageMessage(uri), ...messages],
        });
    };

    handleChangeFocus = (isFocused) => {
        this.setState({ isInputFocused: isFocused });
    };

    handleSubmit = (text) => {
        const { messages } = this.state;

        this.setState({
            messages: [createTextMessage(text), ...messages],
        });
    };

    handleChangeInputMethod = (inputMethod) => {
        this.setState({ inputMethod });
    };

    renderMessageList() {
        const { messages } = this.state;

        return (
            <View style={styles.content}>
                <MessageList messages={messages} onPressMessage={this.handlePressMesage} />
            </View>
        );
    }

    renderInputMethodEditor = () => (
        <View style={styles.inputMethodEditor}>
            <ImageGrid onPressImage={this.handlePressImage} />
        </View>
    );

    renderToolbar() {
        const { isInputFocused } = this.state;

        return (
            <View style={styles.toolbar}>
                <Toolbar
                    isFocused={isInputFocused}
                    onSubmit={this.handleSubmit}
                    onChangeFocus={this.handleChangeFocus}
                    onPressCamera={this.handlePressToolbarCamera}
                    onPressLocation={this.handlePressToolbarLocation}
                />
            </View>
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
        const { inputMethod } = this.state;

        return (
            <View style={styles.container}>
                <Status />
                <MeasureLayout>
                    {layout => (
                        <KeyboardState layout={layout}>
                            {keyboardInfo => (
                                <MessagingContainer
                                    {...keyboardInfo}
                                    inputMethod={inputMethod}
                                    onChangeInputMethod={this.handleChangeInputMethod}
                                    renderInputMethodEditor={this.renderInputMethodEditor}
                                >
                                    {this.renderMessageList()}
                                    {this.renderToolbar()}
                                </MessagingContainer>
                            )}
                        </KeyboardState>
                    )}
                </MeasureLayout>
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