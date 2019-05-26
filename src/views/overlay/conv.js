/**
 * Name: conv.js
 * Description: This overlay component will be used to request the user to input an email to start a new conversation
 * @author Justin Yau
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { addConversation } from "../../auth/Firebase.js";

export default class Con extends Component {

    emailInput = (text) => {
        this.setState({emailInput: text});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Enter a email to add someone!</Text>
                <Input placeholder='email'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={this.emailInput}
                />
                <Button
                    title="Submit"
                    onPress={() => {
                        addConversation(this.state.emailInput);
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});