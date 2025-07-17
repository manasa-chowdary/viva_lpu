import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
    title:{
        type:String, 
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:['pending', 'completed'],
        default:'pending'
    },
        dueDate: Date,
    priority:{type:String,
        enum:['low','medium','high'],
        default:'medium'}
    },
    { timestamps:true});

export default mongoose.model('Task', taskSchema);