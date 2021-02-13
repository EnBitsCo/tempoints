import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";

export default class Status extends React.Component {
    state = {
        info: [],
    };

    async componentDidMount() {
        this.subscription = NetInfo.addEventListener(this.handleChange,);

        const info = await NetInfo.fetch();

        this.setState({ info });

        //setTimeout(() => this.handleChange({"type": "none"}), 3000);
    };

    componentWillUnmount() {
        this.subscription.remove();
    }

    handleChange = (info) => {
        console.log('Network status changed', info);
        console.log("Connection type", info.type);
        console.log("Is connected?", info.isConnected);
        this.setState({ info });
        //StatusBar.setBarStyle(info === 'none' ? 'light-content' : 'dark-content');
    };

    render() {
        const { info } = this.state;
        
        const isConnected = info.type !== 'none';
        const backgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        );

            const messageContainer = (
                <View style={styles.messageContainer} pointerEvents={'none'}>
                    {statusBar}
                    {!isConnected && (
                        <View style={styles.bubble}>
                            <Text style={styles.text}>No network connection</Text>
                        </View>
                    )}
                </View>
            );

        if(Platform.OS === 'ios') {
            return <View style={[styles.status, { backgroundColor }]}>{statusBar}</View>
        }

        return messageContainer;
    }
}

const statusHeight =
    (Platform.OS === 'ios' ? 0 : 0);

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
});