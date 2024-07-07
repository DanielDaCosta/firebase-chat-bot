import React, { useContext } from "react";
import './Main.css'
import { assets } from '../../assets/assets'
import { ChatContext } from "../../context/ChatContext";
import { ChatContextType } from '../../types/context';
import SaveToFirebase from "../../utils/SaveToFirebase";

const firebaseCollectionName: string = process.env.REACT_APP_FIREBASE_COLLECTION || 'quantum-chat'

const Main = () => {
    const {
        onSent, setInput, input,
        recentPrompt, showResult, loading,
        resultData, prevIds, setPrevIds
    } = useContext(ChatContext) as ChatContextType;

    const processResult = (input: string) : void => {

        // Process and Save GenAI output to Firebase 
        onSent(input).then((output) => {
            SaveToFirebase({
                firebaseCollection: firebaseCollectionName,
                prompt: input,
                answer: output
            }).then((output_id: string) => {
                setPrevIds(prev => [...prev, output_id])
            })
        })
    }

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult ? 
                <>
                <div className="greet">
                    <p><span>Hello, Dev</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="compass" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept urban planning</p>
                        <img src={assets.bulb_icon} alt="bulb_icon" />
                    </div>
                    <div className="card">
                        <p>Braistorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="message_icon" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="message_icon" />
                    </div>
                </div>
                </>
                :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="user_icon" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="gemini_icon" />
                        {loading ? 
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                        
                    </div>
                </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here"/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => processResult(input)} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check
                        its responses. Your privacy and Gemini Apps.
                    </p>  
                </div>
            </div>
        </div>
    );
}
 
export default Main;