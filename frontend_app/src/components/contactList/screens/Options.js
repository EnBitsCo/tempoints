import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';

export default class Options extends React.Component {
    render() {

        const navigationOptions = ({ navigation: { goBack } }) => ({
            title: 'Options',
            headerLeft: (
                <MaterialIcons
                    name="close"
                    size={24}
                    style={{ color: colors.black, marginLeft: 10 }}
                    onPress={() => goBack()}
                />
            ),
        });

        this.props.navigation.setOptions(
            navigationOptions,
        );
        return (
            <View style={styles.container}>
                <DetailListItem title="Update Profile" />
                <DetailListItem title="Change Language" />
                <DetailListItem title="Sign Out" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});