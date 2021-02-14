import { Typography } from '@material-ui/core'
import React, { useState,useEffect,useMemo } from 'react'
import './Countdown.css'
import { WhatsappShareButton,} from "react-share";
import ShareIcon from '@material-ui/icons/Share';

const createFinalDate = (createdAt) => {
    const xdate = new Date(createdAt)
        xdate.setHours(xdate.getHours() + 1)
        return xdate
}


function Countdown({ createdAt, roomName,roomId }) {
    const [timeleft, setTimeleft] = useState()
    const finalDate = useMemo(() => {
        return createFinalDate(createdAt)
    },[createdAt])
    

    useEffect(() => {
    const interval = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = finalDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeleft(minutes + "m " + seconds + "s ")

        if (distance < 0) {
            setTimeleft("EXPIRED!")

  }
    }, 1000);
        
    return () => clearInterval(interval);
  }, [finalDate]);

    return (
        <div className="countdown">
            <div className="countdown_left">
                <div>
                    <Typography variant="h6" color="primary">
                #{roomName}
                    </Typography>
                    <div className="countdown_left">
                        <Typography variant="h6" color='primary'>
                    Code: {roomId}
                    </Typography>
                    <WhatsappShareButton
                    url={window.location.href}>
                    <ShareIcon color="primary"/>
                </WhatsappShareButton>
                    </div>
                
                </div>
            
                  
            </div>
            
            <Typography variant="body1">
                {timeleft}
            </Typography>
        </div>
    )
}

export default Countdown
