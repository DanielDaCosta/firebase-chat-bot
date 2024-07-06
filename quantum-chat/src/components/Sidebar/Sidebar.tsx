import React, { useContext, useEffect, useState } from "react";
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { ChatContext } from "../../context/ChatContext";
import { ChatContextType } from '../../types/context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    const {
        prevPrompts
    } = useContext(ChatContext) as ChatContextType

    // useEffect(() => {

    //     const container = document.getElementById('recent-entries')
    //     if (container) {
    //         container.innerHTML = ''; // Clear previous content

    //         prevPrompts.reverse().forEach((prompt: string, index) => {
    //             const  div = document.createElement('div');
    //             div.className = "recent-entry";
    //             div.innerHTML = `
    //                  <img src=${assets.message_icon} alt="" />
    //                 <p>${prompt.substring(0,10)}</p>
    //             `;
    //             container.appendChild(div);
    //         })
    //     }

    // }, [prevPrompts])



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
                        prevPrompts.map((item, index) => {
                            return(
                                <div className="recent-entry">
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