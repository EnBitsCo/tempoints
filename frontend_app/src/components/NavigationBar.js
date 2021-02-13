import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default function NavigationBar({ title, leftText, onPressLeftText }) {
    return (
        <View style={StyleSheet.container}>
            <TouchableOpacity style={StyleSheet.leftText} onPress={onPressLeftText}>
                <Text>{leftText}</Text>
            </TouchableOpacity>
            <Text style={StyleSheet.title}>{title}</Text>
        </View>
    );
}

NavigationBar.prototype = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
    title: '',
    leftText: '',
    onPressLeftText: () => {},
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '500',
    },
    leftText: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});