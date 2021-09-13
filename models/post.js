const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    likes:[{type:ObjectId,ref:"User"}],
    happy:[{type:ObjectId,ref:"User"}],
    sad:[{type:ObjectId,ref:"User"}],
    angry:[{type:ObjectId,ref:"User"}],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post", postSchema)