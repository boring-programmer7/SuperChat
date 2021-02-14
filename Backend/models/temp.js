import mongoose from "mongoose";

const tempSchema = mongoose.Schema(
    {
        messageId:String,
        fileName: String,
       createdAt: { type: Date, expires: 3600, default: Date.now }
  },
);
export default mongoose.model("temp", tempSchema);
