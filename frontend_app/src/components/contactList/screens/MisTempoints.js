import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../utils/colors'

export default class MisTempoints extends React.Component {

    render() {
        const { navigation } = this.props;

        const options = {
            title: 'Mis Tempoints',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <MaterialIcons
                    name="menu"
                    size={24}
                    style={{ color: colors.black, marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                />
            ),
        };

        this.props.navigation.setOptions(
            options,
        );

        return(
            <View style={styles.container}>
                <View style={styles.detailSection}>
                    <View
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'center', flexGrow: 1, }} >
                        <Text style={styles.title, { paddingRight: 15, } }>Mis TemPoints</Text>
                        <Icon
                            style={{ color: colors.blue, }}
                            name={'hourglass-half'}
                            size={22}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 18,
    },
    detailSection: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});