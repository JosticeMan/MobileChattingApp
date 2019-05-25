/**
 * Name: signedOut.js
 * Description: This component will be displayed when the user first enters the app as they need to log in
 * @authors Justin Yau
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { newUser, signIn } from '../../auth/Firebase.js';

export default class SignedOut extends Component {

    _isMounted = false;

    state = {
        username: "",
        email: "",
        password: "",
        errorMsg: "",
    };

    componentDidMount(): void {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // This will be used whenever the user changes the text input for email
    emailInput = (text) => {
        this.setState({email: text} )
    }

    // This will be used whenever the user changes the text input for password
    passInput = (text) => {
        this.setState( {password: text} )
    }

    // This will be used to update the errorMsg after a API call
    updateMsg = (msg) => {
        this.setState({errorMsg: msg});
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Mino!</Text>
                <Input
                    placeholder='email'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />
                    }
                    onChangeText={this.emailInput}
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
                    onChangeText={this.passInput}
                />

                <Button
                    title="Sign up"
                    onPress={() => {
                        if(this._isMounted) {
                            newUser(this.state.email, this.state.password, this.updateMsg, function(status) {
                                if(status) {
                                    navigation.navigate("SignedIn");
                                }
                            })
                        }
                    }}
                />
                <Button
                    title="Sign in"
                    onPress={() => {
                        if(this._isMounted) {
                            signIn(this.state.email, this.state.password, this.updateMsg, function(status) {
                                if(status) {
                                    navigation.navigate("SignedIn");
                                }
                            })
                        }
                    }}
                />
                <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    errorMsg: {
        color: "red",
    },
});
