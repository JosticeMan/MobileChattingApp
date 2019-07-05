/**
 * Name: chatScreen.js
 * Description: This component will contain all the necessary things that are required for the chat screen page
 * @authors Justin Yau
 */
import React, { Component } from "react";
import { GiftedChat} from "react-native-gifted-chat";
import { getUID, sendMessage, loadMessages, closeChat } from "../../auth/Firebase.js";

export default class chatScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
          title: navigation.getParam('other_username', null),
        };
    };

    state = {
        messages: [],
    };

    addMsg = (msg) => {
        this.setState({messages: [...this.state.messages, msg]});
    }

    componentDidMount(): void {
        const { navigation } = this.props;
        loadMessages((msg) => {
            this.addMsg(msg);
        },  navigation.getParam('other_userId', null));
    }

    componentWillUnmount(): void {
        const { navigation } = this.props;
        closeChat(navigation.getParam('other_userId'), null);
    }

    sendMsg = (message) => {
        const { navigation } = this.props;
        sendMessage(message, navigation.getParam('other_userId', null));
    }

    render() {
        const { navigation } = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.sendMsg}
                user={{
                    _id: getUID(),
                    username: navigation.getParam('your_username', null),
                }}
                inverted={false}
                scrollToBottom={true}
            />
        );
    }
}