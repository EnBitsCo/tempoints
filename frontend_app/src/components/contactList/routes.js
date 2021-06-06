import React, { PropTypes } from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Contacts from './screens/Contacts';
import Mapa from './screens/Mapa';
import Profile from './screens/Profile';
import ProfileProducto from './screens/ProfileProducto';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import Tempoint from './screens/Tempoint';
import GeoTempoint from './screens/GeoTempoint';
import colors from './utils/colors';

const getTabBarIcon = icon => ({ color }) => (
    <Icon name={icon} size={26} style={{ color: color }} />
);

const getDrawerItemIcon = icon => ({ color }) => (
    <Icon name={icon} size={22} style={{ color: color }} />
);

const Stack = createStackNavigator();

// Mapa
function MapaScreen () {
    return (
        <Stack.Navigator
            initialRouteName="Zonas"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}>
            <Stack.Screen
                name="Zonas"
                component={ Mapa }
                /*options={{
                    title: 'Contacts',
                    headerTitleAlign: 'center',
                }}*/
            />
            <Stack.Screen
                name="Profile"
                component={ Profile }
                /*options={( navigation ) => {
                    const { route: { params } } = navigation;
                    const { contact: { name } } = params;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        },
                    };
                }}*/
            />
        </Stack.Navigator>
    );
}

// Favorites
function FavoritesScreen () {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}>
            <Stack.Screen
                name="Favorites"
                component={ Favorites }
                /*options={{
                    title: 'Favorites',
                    headerTitleAlign: 'center',
                }}*/
            />
            <Stack.Screen
                name="Profile"
                component={ Profile }
                /*options={( navigation ) => {
                    const { route: { params } } = navigation;
                    const { contact: { name } } = params;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        },
                    };
                }}*/
            />
        </Stack.Navigator>
    );
}

// User
function UserScreen () {
    return (
        <Stack.Navigator
            initialRouteName="User"
            mode='modal'
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}
        >
            <Stack.Screen
                name="User"
                component={ User }
                /*options={{
                    title: 'User',
                    headerTitleAlign: 'center',
                }}*/
            />
            <Stack.Screen
                name="Options"
                component={ Options }
            />
        </Stack.Navigator>
    );
}

// Tempoint screen title
function TempointTitle() {
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', }} >
            <Text
                style={{ flexGrow: 1, color: colors.black,
                         fontWeight: 'bold', fontSize: 18, width: '70%', }}>Mis Tempoints</Text>
            <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center',
                         justifyContent: 'center', width: '30%', flexGrow: 1, }} >
                <Icon
                    style={{ color: colors.greyLight, paddingRight: 15, }}
                    name={'hourglass-half'}
                    size={22}
                />
                <Text style={{ color: colors.black, fontWeight: 'bold', fontSize: 18, }}>{325}</Text>
            </View>
        </View>
    );
  }

// Tempoint
function TempointScreen () {
    return (
        <Stack.Navigator
            initialRouteName="Tempoint"
            mode="modal"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}
        >
            <Stack.Screen
                name="Tempoint"
                /*component={ Tempoint }*/
                component={ GeoTempoint }
                options={{ headerTitle: props => <TempointTitle {...props} /> }}
            />
            <Stack.Screen
                name="ProfileProducto"
                component={ ProfileProducto }
                /*options={( navigation ) => {
                    const { route: { params } } = navigation;
                    const { contact: { name } } = params;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        },
                    };
                }}*/
            />
        </Stack.Navigator>

    );
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName="TemPoint"
            tabBarOptions={{
                style: {
                    backgroundColor: colors.greyLight,
                    height:65,
                },
                showLabel: true,
                showIcon: true,
                labelStyle:{
                    fontSize: 14,
                    marginTop: 4,
                    marginBottom: 5,
                },
                activeTintColor: colors.blue,
                inactiveTintColor: colors.greyDark,
                labelPosition: 'below-icon',
            }}
        >
            <Tab.Screen
                name="TemPoint"
                component={TempointScreen}
                options={{
                    tabBarIcon: getTabBarIcon('map-marker'),
                }}
            />
            <Tab.Screen
                name="Mis Tempoints"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: getTabBarIcon('hourglass-half'),
                }}
            />
            <Tab.Screen
                name="Catálogo"
                component={UserScreen}
                options={{
                    tabBarIcon: getTabBarIcon('newspaper-o'),
                }}
            />
            <Tab.Screen
                name="Zonas"
                component={MapaScreen}
                options={{
                    tabBarIcon: getTabBarIcon('map-o'),
                }}
            />
        </Tab.Navigator>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No New Notifications!</Text>
            <Button 
                onPress={() => navigation.goBack()}
                title="Go back home"
            />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Contacts"
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        drawerIcon: getDrawerItemIcon('home'),
                    }}
                />
                <Drawer.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{
                        drawerIcon: getDrawerItemIcon('star'),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

// const Stack = createStackNavigator();

// export function AppNavigator() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator
//                 initialRouteName="Contacts"
//                 screenOptions={{
//                     headerStyle: {
//                         backgroundColor: colors.blue,
//                     }
//                 }}>
//                 <Stack.Screen
//                     name="Contacts"
//                     component={ Contacts }
//                     /*options={{
//                         title: 'Contacts',
//                         headerTitleAlign: 'center',
//                     }}*/
//                 />
//                 <Stack.Screen
//                     name="Profile"
//                     component={ Profile }
//                     /*options={( navigation ) => {
//                         const { route: { params } } = navigation;
//                         const { contact: { name } } = params;
//                         return {
//                             title: name.split(' ')[0],
//                             headerTintColor: 'white',
//                             headerStyle: {
//                                 backgroundColor: colors.blue,
//                             },
//                         };
//                     }}*/
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
