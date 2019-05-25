/**
 * Name: chat.js
 * Description: This will contain all the things necessary for the component to operate as a chatting service
 * @author Justin Yau
 */
import React, { Component } from "react";
import {Text, View} from "react-native";
import {Header} from "react-native-elements";
import { hasName } from "../../auth/Firebase.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { setUsername } from "../../auth/Firebase";

export default class Chat extends Component {

    state = {
        hasUsername: false,
        username: "",
    }

    componentDidMount(): void {
        hasName((status) => {
            this.setState({hasUsername: status});
        });
    }

    userInput = (text) => {
        this.setState({username: text});
    }

    updatedDB = (status) => {
        this.setState({hasUsername: status});
    }

    render() {
        const { hasUsername } = this.state;
        if(!hasUsername) {
            return (
                <View>
                    <Text>Please enter a username</Text>
                    <Input
                        placeholder='username'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={this.userInput}
                    />
                    <Button
                        title="Start Chatting"
                        onPress={() => {
                            setUsername(this.state.username, this.updatedDB);
                        }}
                    />
                </View>
            );
        }

        return (
          <View>
              <Header
                centerComponent={{text: "Chat", style: { color: '#fff' }}}
              />
          </View>
        );
    }
}