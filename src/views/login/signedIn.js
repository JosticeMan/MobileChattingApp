import React, { Component } from "react";
import {Text, View} from "react-native";
import { Button } from "react-native-elements";
import { signOut } from "../../auth/Firebase.js";

export default class SignedIn extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>You are signed in!</Text>
                <Button
                    title="Sign Out"
                    onPress={() => signOut((status) => {
                        if(status) {
                            navigation.navigate("SignedOut");
                        }
                    })}
                />
            </View>
        );
    }
}