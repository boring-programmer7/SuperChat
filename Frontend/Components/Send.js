import { Button, IconButton, TextField} from '@material-ui/core'
import React,{useState} from 'react'
import { useStateValue } from '../StateProvider'
import './Send.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function Send({ roomId }) {


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

    const [emojiPicker,setEmojiPicker]=useState(false)
    const onEmojiClick = (event, emojiObject) => {

        setMessage(`${message}${emojiObject.emoji}`)
    };
    
    const [{ userName, userId, photoUrl }] = useStateValue()
    const [message, setMessage] = useState("")
    const API = process.env.REACT_APP_API
    const [img,setImage]=useState()
    const [imgFile, setImageFile] = useState()
    const[sending,setSending]=useState(false)
    const [fileName,setFilename]=useState()
    const onSend = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            const formData = new FormData()
            formData.append('image', imgFile)
            formData.append('userName', userName)
            formData.append('message', message)
            formData.append('roomId', roomId)
            formData.append('photoUrl', photoUrl)
            formData.append('userId',userId)
            formData.append('fileName',fileName)
            
            const r = await fetch(`${API}/create/message`, {
                method: 'post',
                body: formData,
            })
            const data = await r.json()
            //console.log("sended!", r.status, data)
            setMessage("")
            setImage(null)
            setImageFile(null)
            setSending(false)
            setFilename(null)
        } catch (e) {
            console.log(e.message)
            setSending(false)
        }
    }

    const handleTextMessage = (e) => {
        if ((e.key === "Enter")&&(sending===false) ) {
            onSend(e)
    
        }
    }


    const onChangeInputFile=(e) => {
        const file = e.target.files[0]
        const ext = file?.name?.split('.').pop()
        if (checkExtension(ext) === "image") {
            setImage(
                {
                    type: 'image',
                    name:file.name,
                    url: file ? URL.createObjectURL(file, { autoRevoke: true }) : null
                }

            )
            setFilename(file.name)
        }
        else {
            setImage({ type: 'other', name: file.name })
            setFilename(file.name)
        }
        
        setImageFile(file)
        setFilename(file.name)
        }


    return (
        <div>
{img && (
                <div className="preview">
                    <div className="preview_header">
                <IconButton
                        color="primary"
                        component="span"
                            onClick={() => { setImage(null);setImageFile(null)}}
                    
                    >
                <CloseIcon />
                </IconButton>
                    </div>
                    
                    <div className="preview_body">
    
                    {img.type === "image" && (
                         <img className="image_preview" src={img.url} alt={img.name} />
                    )}
                      {img.type === "other" && (
                            <p className="video_preview">Preview not available for {img.name}</p>
                )}
                    </div>

                   
               
                </div>
            )}

            <div style={{ display:emojiPicker?'flex':'none'}}>
                
                    <Picker onEmojiClick={onEmojiClick}
                    disableSkinTonePicker={true}
                    disableSearchBar={true}
                     />
                
                

            </div>
            
            <div className="send_message">
            
                <form>

                <div className="send_left">
                        <IconButton 
                    onClick={() => { setEmojiPicker(!emojiPicker) }}>
                    <InsertEmoticonIcon/>
                    </IconButton>
                    
                        <IconButton>
                            <label for="file-input" class="label_file_input">
                            <AttachFileIcon/>
                        </label>
                        </IconButton>
                        

                        <input type="file"
                            name="image"
                            id="file-input"
                                style={{display:'none'}}
                            onChange={(e) => onChangeInputFile(e)} />
                    

                </div>

                    <div className="send_center">
                            <TextField
                            type="text"
                            placeholder="Type a message..."
                            multiline
                            variant="outlined"
                            value={message}
                            onChange={(e) => {setMessage(e.target.value)}}
                            onKeyPress={(e)=>handleTextMessage(e)}
                            rows={1}
                            rowsMax={4}
                        
                        />
                    </div>

                    <div className="send_right">

                        

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={onSend}
                            disabled={sending}
                        >{sending?"Sending":"Send"}
                        </Button>

                </div>
                
                
            </form>
            
        </div>
        </div>
        
        
        
    )
}

export default Send
