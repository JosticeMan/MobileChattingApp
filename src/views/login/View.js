import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

function loginView() {
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Mino!</Text>
        <Input
            placeholder='username'
            leftIcon={
                <Icon
                    name='user'
                    size={24}
                    color='black'
                />
            }
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
        />
    </View> )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


module.exports = {loginView};