import React, { Component } from 'react';
import {
    AsyncStorage,
    Modal,
    Platform,
    StyleSheet,
    View,
} from "react-native";

import Feed from '../screens/Feed';
import Comments from '../screens/Comments';

const items = [
    { id: 0, author: 'Bob Ross' },
    { id: 1, author: 'Chuck Norris' },
];

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class SalesScreen extends React.Component {

    state = {
        commentsForItem: {},
        showModal: false,
        selectedItemId: null,
    };

    openCommentScreen = id => {
        this.setState({
            showModal: true,
            selectedItemId: id,
        });
    };
    
    closeCommentScreen = () => {
        this.setState({
            showModal: false,
            selectedItemId: null,
        });
    };

    onSubmitComment = (text) => {
        const { selectedItemId, commentsForItem } = this.state;
        const comments = commentsForItem[selectedItemId] || [];

        const updated = {
            ...commentsForItem,
            [selectedItemId]: [...comments, text],
        };

        this.setState({ commentsForItem: updated });

        try {
            AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
        } catch(e) {
            console.log('Failed to save comment', text, ' for ', selectedItemId);
        }
    };

    async componentDidMount() {
        try {
            const commentsForItem = await AsyncStorage.getItem(
                ASYNC_STORAGE_COMMENTS_KEY,
            );

            this.setState({
                commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
            });
        } catch(e) {
            console.log('Failed to load comments');
        }
    }

    render() {
        const { commentsForItem, showModal, selectedItemId } = this.state;

        return (
            <View style={styles.container}>
                <Feed
                    style={styles.feed}
                    commentsForItem={commentsForItem}
                    onPressComments={this.openCommentScreen}
                />
                <Modal
                    visible={showModal}
                    animationType="slide"
                    onRequestClose={this.closeCommentScreen}
                >
                    <Comments
                        style={styles.container}
                        comments={commentsForItem[selectedItemId] || []}
                        onClose={this.closeCommentScreen}
                        onSubmitComment={this.onSubmitComment}
                    />
                </Modal>
            </View>
        );
    }
}

const platformVersion =
    Platform.OS == 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feed: {
        flex: 1,
        marginTop:
            Platform.OS === 'android' || platformVersion < 11
                ? 0 // Constants.statusBarHeight usando Expo
                : 0,
    },
    comments: {
        flex: 1,
        marginTop:
            Platform.OS === 'ios' && platformVersion < 11
                ? 0 // ConstantSourceNode.statusBarHeight -> Cuando se usa Expo
                : 0,
    },
});