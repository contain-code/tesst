import React from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT 
import { 
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract 
}from "../Utils/apiFeature";

export const ChatAppContext = React.createClass();

export const ChatAppProvider = ({children}) => {
    const title = "Hey Welcome to Blockchain Chat App!";
    return(
        <ChatAppContext.Provider>
            {children}
        </ChatAppContext.Provider>
    );
}