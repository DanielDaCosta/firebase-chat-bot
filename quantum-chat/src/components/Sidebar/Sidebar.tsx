import React, { useContext, useEffect, useState } from "react";
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { ChatContext } from "../../context/ChatContext";
import { ChatContextType } from '../../types/context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    const {
        prevPrompts, setRecentPrompt,
        setResultData, prevAnswers
    } = useContext(ChatContext) as ChatContextType


    const loadPrompt = (index: number) => {
        const originalIndex = prevPrompts.length - 1 - index;
        setRecentPrompt(prevPrompts[originalIndex]);
        setResultData(prevAnswers[originalIndex]);

    }

    return (  
        <div className="sidebar">
            <div className="top">

                <img className="menu" src={assets.menu_icon} alt="" onClick={() => setExtended(!extended)}/>
                <div className="new-chat">
                    <img src={assets.plus_icon} alt=""/>
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended? 
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {
                        prevPrompts.slice().reverse().map((item, index) => {
                            return(
                                <div key={index} onClick={() => loadPrompt(index)}className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0,18)}...</p>
                                </div>
                            )
                        })
                    }
                </div> 
                : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p>: null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ?<p>Activity</p> : null }
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p>:null}
                </div>
            </div>

        </div>
    );
}
 
export default Sidebar;