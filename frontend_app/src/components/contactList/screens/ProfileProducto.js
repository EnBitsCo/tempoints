import React from 'react';
import { StyleSheet, View } from 'react-native';

import ProductoThumbnail from '../components/ProductoThumbnail';
import DetailListItem from '../components/DetailListItem';

import { fetchRandomContact } from '../utils/api';

import colors from '../utils/colors';

export default class Profile extends React.Component { 
    state = {
        producto: {},
    };

    /* async componentDidMount() {
        const contact = await fetchRandomContact();

        this.setState({
            contact,
        });
    } */

    render() {
        const { route: { params } } = this.props;
        const { producto } = params;
        const {
            urlImagen, nombre, almacen, descripcion, descuento, tempoints,
        } = producto;

        const options = {
            //title: name.split(' ')[0],
            title: nombre,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: colors.blue,
            },
        };
        
        this.props.navigation.setOptions(
            options,
        );

        return (
            <View style={styles.container}>
                <View style={styles.avatarSection}>
                    <ProductoThumbnail avatar={urlImagen} name={descripcion} tempoints={tempoints} />
                </View>
                <View style={styles.detailSection}>
                    <DetailListItem icon="store" title="Almacén" subtitle={almacen} />
                    <DetailListItem icon="percentage" title="Descuento" subtitle={descuento} />
                    <DetailListItem icon="hourglass-half" title="TemPoints" subtitle={tempoints} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailSection: {
        flex: 1,
        backgroundColor: 'white',
    },
});