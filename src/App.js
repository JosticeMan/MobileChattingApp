/**
 * The main app that will be used to render in the App.
 *
 * @format
 * @flow
 * @authors Justin Yau
 */

import React, {Component} from 'react';
import { Platform, View, Text } from 'react-native';
import { isSignedIn } from './auth/Firebase.js';
import { createAppContainer } from 'react-navigation';
import { createNavigator } from "./route/router.js";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedStatus: false,
    };
  }

  componentDidMount(): void {
    isSignedIn()
        .then(res => this.setState({signedIn: res, checkedStatus: true}))
        .catch(() => alert("An error occurred when checking signIn status."));
  }


  render() {
    const {signedIn, checkedStatus} = this.state;
    if(!checkedStatus) {
      return null;
    }

    const Page = createAppContainer(createNavigator(signedIn));
    return <Page />;
  }
}
