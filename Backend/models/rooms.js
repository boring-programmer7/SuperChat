import mongoose from "mongoose";
import shortid from 'shortid'

const roomSchema = mongoose.Schema(
  {_id:{
          type: String,
          default: shortid.generate
      },
    key:String,
        roomName: String,
       createdAt: { type: Date, expires: 3600, default: Date.now }
  },
);
export default mongoose.model("rooms", roomSchema);