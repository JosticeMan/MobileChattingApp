/**
 * Name: router.js
 * Description: This file will contain all navigators and routing related components that will be utilized by
 * other components as needed
 * @author Justin Yau
 */

import React from "react";
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import SignedOut from "../views/login/signedOut.js";
import SignedIn from "../views/login/signedIn.js";
import Store from "../views/main/store.js";
import Chat from "../views/main/chat.js";
import ChatScreen from "../views/chat/chatScreen.js";
import { Icon } from 'react-native-elements';

// This navigator will be used to switch between the conversation list and individual chat pages
export const createStackNav = () => {
    return (createStackNavigator({
        Chat: {
            screen: Chat,
        },
        ChatScreen: {
            screen: ChatScreen,
        }
    }, {
        initialRouteName: "Chat",
    }))
}


// This will be used as the logged in homepage navigator
// @author Justin Yau
export const createTabNavigator = () => {
    return (createBottomTabNavigator({
       Home: {
           screen: SignedIn,
           navigationOptions: {
               tabBarLabel: "Home",
               tabBarIcon: ({ tintColor }) => (
                   <Icon name="home" size={30} color={tintColor} />
               )
           }
       },
       Store: {
           screen: Store,
           navigationOptions: {
               tabBarLabel: "Store",
               tabBarIcon: ({ tintColor }) => (
                   <Icon name="store" size={30} color={tintColor} />
               )
           }
       },
       Chat: {
           screen: createStackNav(),
           navigationOptions: {
               tabBarLabel: "Chat",
               tabBarIcon: ({ tintColor }) => (
                   <Icon name="chat" size={30} color={tintColor} />
               )
           }
       },
    }, {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }));
}

// This navigator will be used by the login portion of the App to switch between the signed in and out screens.
// @author Justin Yau
export const createNavigator = (signedIn = false) => {
    return createSwitchNavigator (
        {
            SignedIn: {
                screen: createAppContainer(createTabNavigator())
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
