/**
 * Name: chatScreen.js
 * Description: This component will contain all the necessary things that are required for the chat screen page
 * @authors Justin Yau
 */
import React, { Component } from "react";
import {View} from "react-native";
import { GiftedChat} from "react-native-gifted-chat";

export default class chatScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
          title: navigation.getParam('other_username', null),
        };
    };

    render() {
        return (
            <View>
                <GiftedChat />
            </View>
        );
    }
}