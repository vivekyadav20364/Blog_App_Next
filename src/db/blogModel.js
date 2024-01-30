import mongoose, { Schema } from 'mongoose'

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    introductions:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true,
    },
}
,{
    timestamps:true
});

const Blogs = mongoose.models.blogs ||  mongoose.model('blogs',blogSchema);

export default Blogs;