import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        alignItems:'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(45),
      height: theme.spacing(45),
    },
    },
    formControl: {
    margin: theme.spacing(3),
  },
  button: {
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    form: {
        marginBottom: '10px',
        width: '100%',
        display: 'flex',
        flexDirection:'column'
    }
}));

function Form() {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [roomName, setRoomName] = React.useState("")
    const [roomPass, setRoomPass] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    
    const history = useHistory()
    const API=process.env.REACT_APP_API
    //Functions
    const handleRadioChange = (event) => {
    setValue(event.target.value);
    setError(false);
    };
    //Create/Go Chat
    const goChat = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (value === "create") {
            
            const r= await fetch(`${API}/create/room/${roomName}`, {
                method: 'POST',
                header:{'content-type':'application/json'},
                body:JSON.stringify({roomName})
            })
            const data = await r.json()
            setLoading(false)
            history.push(`/room/${data._id}`)
        } else {
            history.push(`/room/${roomPass}`)
        }
    }


    return (
        
        <div className={classes.root}>
            {!loading ? (
                <Paper elevation={5} className={classes.paper}>
        <FormControl component="fieldset" error={error} className={classes.formControl}>
                    <FormLabel component="legend"
                        color={value==="create"?"primary":"secondary"}
                        style={{ marginBottom: '10px' }}>What do you want today?</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="create" control={<Radio color="primary" />} label="Create a Room" />
          <FormControlLabel value="enter" control={<Radio color="secondary"/>} label="Enter to Chat" />
                    </RadioGroup>
                    
                    <form className={classes.form} noValidate autoComplete="off">
                        {value === 'create' && (
                            <TextField
                                id="roomName"
                                className="form_text"
                                color="primary"
                            label="Room Name"
                            value={roomName}
                            onChange={(e)=>{setRoomName(e.target.value)}} />
                        )}
                        {value === 'enter' && (
                            <TextField
                            className="form_text"
                                id="roomPassword"
                                color="secondary"
                            label="Room Password"
                            value={roomPass}
                        onChange={(e)=>{setRoomPass(e.target.value)}}/>
                        )}
                        <Button type="submit" variant="outlined" color={value==="enter"?"secondary":"primary"} className={classes.button}
                                onClick={(e) => goChat(e)}>Go!</Button>       
                           
        </form>

      </FormControl>
      
    </Paper>
            ) : (
                    <Paper  elevation={5} className={classes.paper}>
                        <p>Creating your room... 🚀 </p>
                    </Paper>
            )}
        
    </div>
    )
}

export default Form
