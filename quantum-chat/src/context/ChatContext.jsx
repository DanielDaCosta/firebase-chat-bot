import { createContext } from 'react';
import React from 'react';
import runChat from '../config/gemini';

export const ChatContext = createContext(null);


const ChatContextProvider = ({ children }) => {

    const onSent = async (prompt) => {
        await runChat(prompt)
    }

    onSent("waht is react js?")

    const contextValue = {
    }

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider