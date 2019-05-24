import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { newUser, signIn, FireErrorText } from '../../auth/Firebase.js';

export default class SignedOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMsg: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Mino!</Text>
                <Input
                    placeholder='email'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={(text) => this.setState({username: text, password: this.state.password,
                        errorMsg: this.state.errorMsg})}
                />
                <Input
                    placeholder='password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({username: this.state.username, password: text,
                        errorMsg: this.state.errorMsg})}
                />

                <Button
                    title="Sign up"
                    onPress={() => newUser(this.state.username, this.state.password)}
                />
                <Button
                    title="Sign in"
                    onPress={() => signIn(this.state.username, this.state.password)}
                />
                <FireErrorText />
            </View> )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
