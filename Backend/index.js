import dotenv from 'dotenv'
dotenv.config()


//importing stuff
import express from "express";
import mongoose from "mongoose";
import Pusher from 'pusher'
import Messages from "./models/messages.js";
import Rooms from "./models/rooms.js";
import upload from './libs/storage.js'
import Temp from './models/temp.js'
import bodyParser from 'body-parser'
import path, { dirname } from 'path';
import fs from 'fs'
import cors from 'cors'

//Pusher

const pusher = new Pusher({
  appId: "1103026",
  key: "752d3cfebe16e689ca66",
  secret: "fe31b048d19d22a50efd",
  cluster: "us2",
  useTLS: true
});



//App config
const app = express();
const port = process.env.PORT || 9000;
const __dirname = path.resolve();



//middlewares
// Add headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.use('/public', express.static(`${__dirname}/storage/imgs`))


//DB config

const mongoPass = process.env.DBPSW;
const dbName = process.env.DBNAME;
const mongoUri = `mongodb+srv://admin:${mongoPass}@cluster0.xnrka.mongodb.net/${dbName}?retryWrites=true&w=majority`


mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log("DB Connected!")
  const changeStream = mongoose.connection.collection("messages").watch()
  changeStream.on('change', (change) => {
    //console.log(change)
    pusher.trigger('messages', 'newMessage', {
      'change':change
    })

    //delete files in static if delete

    if (change.operationType === 'delete') {
      const messageId=change.documentKey._id
      console.log("DELETED", messageId)
      Temp.find(
        { $query: { messageId: String(messageId) } },
        (err, res) => {
          if (err) {
            console.log(err)
          } else {
            res.map((file) => {
              console.log("deleted.....",file.fileName)
              fs.unlinkSync(path.join(__dirname,'storage','imgs',file.fileName))
            })
          }
        }
      )
    }


  })
  
})


//Routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//Create a Room

app.post("/create/room/:roomName", (req, res) => {
  const room = { roomName: String(req.params.roomName) }
  Rooms.create(room, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Messages.create(
        {
          roomId: data._id ,roomName:data.roomName,userId: 'bot21', userName: 'Bot21',
          message: "Hey, remember that your messages will be deleted in 10 minutes. And this room in one hour.",
          photoUrl:"https://firebasestorage.googleapis.com/v0/b/superchat-c8496.appspot.com/o/bot.png?alt=media&token=3e0a06b9-e470-411e-b2b5-2d163c337d4f",
        },
        (err2, data2) => {
          if (err2) {
            res.status(500).send(err2);
          } else {
            res.status(201).send(data);
          }
        }
      )
    }
  }
  )
  
})


//create a message


//Random 2
app.post("/create/message", upload.single('image'), async (req, res) => {
  const body = req.body
  const data = {
    roomId: body.roomId,
    roomName: body.roomName,
    userId: body.userId,
    userName: body.userName,
    message: body.message,
    photoUrl: body.photoUrl,
    fileName:body.fileName,
  }
  var msg = new Messages(data)
  

  try {
    if (req.file) {
      //console.log(req.file)
      const { filename } = req.file
      console.log(filename)
      msg.setStorageUrl(filename)

    }
    const imageStored = await msg.save()
    if (req.file) {
      const { filename } = req.file
      var temp = new Temp(
      {
        messageId: String(imageStored._id),
        fileName:filename
        }
      )
      await temp.save()
      
    }
    
      
      
  res.status(201).send({imageStored })
  } catch(e) {
    res.status(500).send({ message: e.message })
  }
   
})


//Get Chat from room

app.get("/room/:roomId", (req, res) => {
  const roomId = req.params.roomId
  Rooms.findById(roomId, (errRoom, resRoom) => {
    if (errRoom) {
      res.status(500).send(errRoom)
    }
    else {
      if (resRoom != null) {
      
         Messages.find({ $query: { roomId: String(resRoom._id) }, $orderby: { createdAt: -1 } }, (errMsg, resMsg) => {
        if (errMsg) {
          res.status(500).send(errMsg)

        } else {
            res.status(200).send({'roomInfo':resRoom,'messages':resMsg})

          }
        })
      }
      else {
        res.status(500).send("Error")
      }
     
    }
  })
})






//StartServer (Listen)
app.listen(port, () => console.log("Listening on localhost: ", port));
