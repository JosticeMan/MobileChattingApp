import React from "react";
import { createSwitchNavigator } from "react-navigation";
import SignedOut from "../views/login/signedOut.js";
import SignedIn from "../views/login/signedIn.js";

export const createNavigator = (signedIn = false) => {
    return createSwitchNavigator (
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
