/**
 * Name: chat.js
 * Description: This will contain all the things necessary for the component to operate as a chatting service
 * @author Justin Yau
 */
import React, { Component } from "react";
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import {Header} from "react-native-elements";
import { hasName } from "../../auth/Firebase.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Overlay } from 'react-native-elements';
import { setUsername, buildConversations, closeConversations } from "../../auth/Firebase";
import Con from "../overlay/conv.js";

export default class Chat extends Component {

    state = {
        hasUsername: false,
        username: "",
        isVisible: false,
        emailInput: "",
        conversations: [],
    }

    addCon = (chat) => {
        this.setState({conversations: [...this.state.conversations, chat]})
    }

    componentDidMount(): void {
        hasName((status, stored) => {
            if(status) {
                this.setState({username: stored});
            }
            this.setState({hasUsername: status});
        });
        buildConversations((chat) => {
            this.addCon(chat);
        });
    }

    userInput = (text) => {
        this.setState({username: text});
    }

    updatedDB = (status) => {
        this.setState({hasUsername: status});
    }

    updateVisible = (status) => {
        this.setState({ isVisible: status});
    }

    _renderCon = function({item}) {
        if(item.other_accept && item.you_accept) { // Both added
            return (
                <TouchableOpacity>
                    <Text>{item.other_username}</Text>
                </TouchableOpacity>
            );
        } else if(item.other_accept && !item.you_accept) { // You haven't accepted
            return (
                <TouchableOpacity>
                    <Text>{item.other_username} wants to chat with you! </Text>
                </TouchableOpacity>
            );
        } else { // The other person hasn't added you yet
            return (
                <TouchableOpacity>
                    <Text>{item.other_username} (Hasn't added you yet!)</Text>
                </TouchableOpacity>
            );
        }
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
                rightComponent={<Button icon={<Icon name="plus"/>} onPress={()=>{
                    this.updateVisible(true);
                }}/>}
              />
              <Overlay
                  isVisible={this.state.isVisible}
                  onBackdropPress={() => this.setState({ isVisible: false })}
              >
                  <Con username={this.state.username}/>
              </Overlay>
              <FlatList
                    data={this.state.conversations}
                    renderItem={this._renderCon}
                    keyExtractor={(item) => item.other_userId}
              />
          </View>
        );
    }
}