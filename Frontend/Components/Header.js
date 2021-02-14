import React from 'react'
import { useStateValue } from './../StateProvider';
import Avatar from '@material-ui/core/Avatar';
import './Header.css'
import {  IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Popper from '@material-ui/core/Popper';


const useStyles = makeStyles((theme)=>({

  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50,
    },
     nested: {
    paddingLeft: theme.spacing(4),
    },
      paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
})

);


function Header() {
    const [{ photoUrl, userName, images },dispatch] = useStateValue()
    const classes = useStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;




    const handleChangeName = (e) => {
        dispatch({
            type: 'SET_USERNAME',
            userName: e.target.value
        })
      localStorage.setItem('userName', JSON.stringify(e.target.value));

    }
    const handleChangePicture = (image) => {
        dispatch({
            type: 'SET_PHOTO',
            photoUrl: image
        })
      setAnchorEl(null)
      localStorage.setItem('userPhoto', JSON.stringify(image));

    }
        
    
        
    


    return (
      <div className="header">
        <div className="header_left">
          <TextField id="username"
            variant="outlined"
            value={userName}
            onChange={handleChangeName} />
          </div>

            <div className="header_center"
                onClick={() => {history.push("/")}}>
                <Typography variant="h6">
                    SuperChat🚀
                </Typography>
        </div>
        <div className="header_right">
                
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                  <Avatar alt="urlPhoto" src={photoUrl} className={classes.bigAvatar} />
                </IconButton>

      <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                        
                        <List component="div" disablePadding>
                            {images.map((image) => (
                                <ListItem button className={classes.nested} key={ image.name} onClick={() => { handleChangePicture(image.src) }}>
                    <ListItemIcon>
                        <Avatar alt="urlPhoto" src={image.src}/>
                    </ListItemIcon>
                    <ListItemText primary={image.name} />
                        </ListItem>
                            ))}
                

                </List>
        </div>
      </Popper>
       
        </div>
       </div>
    )
}

export default Header
