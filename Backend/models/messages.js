import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const URI=process.env.URI


const messageSchema = new mongoose.Schema(
  {
    roomId: String,
    roomName:String,
    userName: String,
    userId: String,
    photoUrl:String,
    date: { type: Date, default: Date.now },
    message: String,
    storageUrl:String,
    createdAt: { type: Date, expires: 600, default: Date.now },
    fileName:String,

  },
);

messageSchema.methods.setStorageUrl = function setStorageUrl (filename) {
  this.storageUrl = `${URI}/public/${filename}`
}

var messages=mongoose.model("messages", messageSchema);
export default messages



