import React from 'react';
import { StyleSheet, Text ,View, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ContactThumbnail from '../components/ContactThumbnail';

import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';
import store from '../store';

export default class User extends React.Component {
    state = {
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
    };

    async componentDidMount() {
        this.unsubscribe = store.onChange(() =>
            this.setState({
                user: store.getState().user,
                loading: store.getState().isFetchingUser,
                error: store.getState().error,
            })
        );

        const user = await fetchUserContact();

        store.setState({ user, isFetchingUser: false });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { user, loading, error } = this.state;
        const { avatar, name, phone } = user;
        const { navigation: { navigate } } = this.props;

        const navigationOptions = {
            title: 'Me',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: colors.blue,
            },
            headerLeft: () => (
                <MaterialIcons
                    name="menu"
                    size={24}
                    style={{ color: 'white', marginLeft: 10 }}
                    onPress={() => this.props.navigation.toggleDrawer()}
                />
            ),
            headerRight: () => (
                <MaterialIcons
                    name="settings"
                    size={24}
                    style={{ color: 'white', marginRight: 10 }}
                    onPress={() => { navigate("Options"); }}
                />
            ),
        };

        this.props.navigation.setOptions(
            navigationOptions,
        );

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}

                {!loading && (
                    <ContactThumbnail avatar={avatar} name={name} phone={phone} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
});