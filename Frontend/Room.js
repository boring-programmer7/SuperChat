import React,{useEffect,useState,useRef} from 'react'
import { useParams } from 'react-router-dom'
import Header from './Components/Header'
import {Typography } from '@material-ui/core';
import Send from './Components/Send';
import Message from './Components/Message';
import Pusher from 'pusher-js'
import Countdown from './Components/Countdown';
import { CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const pusher = new Pusher('752d3cfebe16e689ca66', {
      cluster: 'us2'
    });

function Room() {
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState()
    const [createdAt,setCreatedAt]=useState()
    const[loading,setLoading]=useState(true)
    const [data, setData] = useState()
    const API = process.env.REACT_APP_API
    const dummy=useRef()

    //create a function to read messages
        const getMessages = async () => {
            const res = await fetch(`${API}/room/${roomId}`)
            if (res.status === 200){
                const jsonData = await res.json()
                setData(jsonData.messages)
                setRoomName(jsonData.roomInfo.roomName)
                setCreatedAt(jsonData.roomInfo.createdAt)
                setLoading(false)
            } else {
                setLoading(false)
            }
            try {
                dummy.current.scrollIntoView({behavior:'smooth'})
            }
            catch {
                
            }
            
        }


    useEffect(() => {
       const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function(data) {
        getMessages()
    })
    },[])
    
   

 

    useEffect(() => {
        //Call
        getMessages()
    }, [API,roomId])
    
    return (
        <div className="app">
              <Helmet>
                <title>{roomName}</title>
            </Helmet>
      <Header/>
           
            {loading ? (
                <>
                <div className="content">
                        <CircularProgress color="primary"/>
                    </div>
                </>

            ): (
                <> 
                
                
            {data ? (
                            <div className="feed">
                                <Countdown
                                        roomName={roomName}
                                    createdAt={createdAt}
                                    roomId={roomId}
                                    >
                                    </Countdown>
                                <div className="feed_messages">
                                    
                        {data.map((m) => (
                            <Message
                                key={m._id}
                                userName={m.userName}
                                userIdMessage={m.userId}
                                photoUrl={m.photoUrl}
                                text={m.message}
                                file={m.storageUrl}
                                date={m.date}
                                fileName={m.fileName}
                            
                            />
                                
                                
                        ))}
                                    <div ref={dummy}></div>            

                    </div>
                    <Send roomId={roomId}/>
                    </div>
            ) : (
                    <div className="content">
                        <Typography variant="h5" align="center">
                            Sorry, this room is not available any more 😢😢           
                            </Typography>  
                    </div>
                  
                )}
                </>
            )}

        
    </div>
    )
}

export default Room
