import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ContactListItem from '../components/ContactListItem';
import DetailListItem from '../components/DetailListItem';

import { fetchContacts, fetchProductos } from '../utils/api';
import colors from '../utils/colors';
import getURLParams from '../utils/getURLParams';
import store from '../store';

const contactKeyExtractor = ({ phone }) => phone;
const productosKeyExtractor = ({ id }) => id;

export default class MisTempoints extends React.Component {

    state = {
        contacts: store.getState().contacts,
        productos: store.getState().productos,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
    };

    async componentDidMount() {
        this.unsubscribe = store.onChange(() =>
            this.setState({
                contacts: store.getState().contacts,
                productos: store.getState().productos,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            })
        );

        const contacts = await fetchContacts();
        const productos = await fetchProductos();
        
        store.setState({ contacts, productos, isFetchingContacts: false });

        Linking.addEventListener('url', this.handleOpenUrl);

        const url = await Linking.getInitialURL();
        this.handleOpenUrl({ url });
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenUrl);
        this.unsubscribe();
    }

    handleOpenUrl(event) {
        const { navigation: { navigate } } = this.props;
        const { url } = event;
        const params = getURLParams(url);

        /*if(params.name) {
            const queriedContact = store
                .getState()
                .contacts.find(contact =>
                    contact.name.split(' ')[0].toLowerCase() ===
                        params.name.toLowerCase());

            if(queriedContact) {
                navigate('Profile', { id: queriedContact.id });
            }
        }*/
        if(params.name) {
            const queriedProducto = store
                .getState()
                .productos.find(producto =>
                    producto.nombre.split(' ')[0].toLowerCase() ===
                        params.nombre.toLowerCase());

            if(queriedProducto) {
                navigate('ProfileProducto', { id: queriedProducto.id });
            }
        }
    }

    renderContact = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const { id, name, avatar, phone } = item;

        return (
            <ContactListItem
                name={name}
                avatar={avatar}
                phone={phone}
                onPress={() => navigate('Profile', { contact: item })}
            />
        );
    };

    renderProducto = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const { id, nombre, urlImagen, tempoints } = item;

        return (
            <ContactListItem
                name={nombre}
                avatar={urlImagen}
                phone={tempoints}
                onPress={() => navigate('ProfileProducto', { producto: item })}
            />
        );
    };

    render() {
        const { contacts, productos, loading, error } = this.state;
        
        const contactsSorted = contacts.sort((a, b) =>
            a.name.localeCompare(b.name));
        
        const productosSorted = productos.sort((a, b) =>
            a.nombre.localeCompare(b.nombre));
        
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
            <View style={{paddingTop: 15, }}>
                <View style={styles.previewContainer}>
                    <View style={styles.item}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <Text style={[styles.title, { color: "lightgreen", paddingRight: 15, }]}>Zona TemPoints</Text>
                            <Icon
                                style={{ color: "lightgreen", }}
                                name={'hourglass-half'}
                                size={22}
                            />
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center", paddingTop: 5, }}>
                            <Text style={[styles.title]}>C.C. El Mejor</Text>
                        </View>
                    </View>
                    <View style={styles.item, {justifyContent: "space-between", alignItems: "center", }}>
                        <Text style={[styles.title, {alignSelf: "center", }]}>Tiempo(minutos): 35</Text>
                        <Text style={[styles.title, {alignSelf: "center", }]}>TemPoints: 3</Text>
                    </View>
                </View>
                <View style={{paddingTop: 25, paddingBottom: 15, }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.greyDark, textAlign: "center", }}>Destacados</Text>
                </View>
                <View style={styles.container}>
                    {/*<FlatList
                        data={contactsSorted}
                        keyExtractor={contactKeyExtractor}
                        renderItem={this.renderContact}
                    />*/}
                    <FlatList
                        data={productosSorted}
                        keyExtractor={productosKeyExtractor}
                        renderItem={this.renderProducto}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        minHeight: 200,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    previewContainer: {
        flexDirection: "row",
    },
    item: {
        width: '50%',
    },
});