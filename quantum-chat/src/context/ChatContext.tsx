import { createContext, useState } from 'react';
import React from 'react';
import runChat from '../config/gemini';
import { ChatContextType, Prompt, RecentPrompt, ResultData, ShowResult, Loading } from "../types/context";

export const ChatContext = createContext<ChatContextType|null>(null);


const ChatContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {


    const [input, setInput] = useState<Prompt>("");
    const [recentPrompt, setRecentPrompt] = useState<RecentPrompt>("");
    const [prevPrompts, setPrevPrompts] = useState<Prompt[]>([]);
    const [prevAnswers, setPrevAnswers] = useState<Prompt[]>([]);
    const [showResult, setShowResult] = useState<ShowResult>(false);
    const [loading, setLoading] = useState<Loading>(false);
    const [resultData, setResultData] = useState<ResultData>("");
    const [prevIds, setPrevIds] = useState<Prompt[]>([]);
    

    const delayPara = (index: number, nextWord: string) => {
        setTimeout(() => {
            setResultData(prev=> prev + nextWord)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent: ChatContextType["onSent"] = async (prompt: string) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setPrevPrompts(prev=> [...prev, input])       
        const response = await runChat(prompt); 
        let responseArray: Array<string> = response.split("**");
        let newResponse : string = "";
        for(let i=0; i< responseArray.length; i++) {
            if (i == 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i=0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
        setLoading(false);
        setInput("");
        setPrevAnswers([...prevAnswers, newResponse2])
        setPrevPrompts([...prevPrompts, prompt]);
        return newResponse2
    }

    const contextValue: ChatContextType = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setResultData,
        prevAnswers,
        setPrevAnswers,
        newChat,
        prevIds,
        setPrevIds
    }

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider