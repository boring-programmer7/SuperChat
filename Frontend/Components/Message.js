import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import { useStateValue } from '../StateProvider'
import './Message.css'
import Timestamp from 'react-timestamp'
import ReactPlayer from 'react-player'


const checkExtension = (ext) => {
    const videoExtensions=["mpg",'mov', "mpeg", "avi","mp4"]
    const imageExtensions=["jpeg","png","jpg"]
    if (videoExtensions.includes(ext)) {
        return "video"
    }
    if (imageExtensions.includes(ext)) {
        return "image"
    }

    return false
}



function Message({ userIdMessage, userName, photoUrl, text,file,date,fileName }) {
    const [{ userId }] = useStateValue()
    const ext = file?.split('.').pop()
    
    
    return (
        <div className={`message ${userId===userIdMessage? "owner":"recivied"}`}>
            <div className="message_up">
                <div className="message_up_left">
                    <Avatar src={photoUrl}></Avatar>
                <Typography variant="subtitle1">{userName}</Typography>
                </div>
             
               <Timestamp relative date={date} autoUpdate  className="message_up_timestamp"/>
            </div>
            <div className="message_down">
                {file && (
                    <div style={{ margin: '10px' }}>
                        {checkExtension(ext) === "image"&&(
                           <img src={file} alt="image_deleted" />
                        )}
                        {checkExtension(ext) === "video"&&(
                            <ReactPlayer url={file} controls={true} width="100%" height={200}/>
                        )}
                        {checkExtension(ext) === false&&(
                            <a href={file}>
                                <Typography>{fileName}</Typography>
                            </a>
                        )}
                    </div>
                )}
                
                <div className="message_down_text">
                    <p>{text}</p>
                </div>
                

            
            
            </div>
        </div>
    )
}

export default Message
