import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const Stack = createStackNavigator();

// Contacts
function ContactsScreens () {
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}>
            <Stack.Screen
                name="Contacts"
                component={ Contacts }
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
function FavoritesScreens () {
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
function UserScreens () {
    return (
        <Stack.Navigator
            initialRouteName="User"
            mode='modal'
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blue,
                }
            }}>
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

const Tab = createBottomTabNavigator();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Contacts"
                tabBarOptions={{
                    style: {
                        backgroundColor: colors.greyLight,
                    },
                    showLabel: true,
                    labelStyle:{
                        fontSize: 14,
                    },
                    activeTintColor: colors.blue,
                    inactiveTintColor: colors.greyDark,
                    labelPosition: 'below-icon',
                }}
            >
                <Tab.Screen
                    name="Contacts"
                    component={ContactsScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('list'),
                    }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('star'),
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={UserScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('person'),
                    }}
                />
            </Tab.Navigator>
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
