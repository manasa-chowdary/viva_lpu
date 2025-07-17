import express from 'express';
import task from '../models/Task.js';
import verifyToken from '../middleware/authmiddleware.js';

const router=express.Router();
router.use(verifyToken);

router.get('/', async(req,res)=> {
    const tasks=await Task.find({userId: req.userId});
    res.json(tasks);
});

router.post('/', async(req, res)=>{
    const newTask=new Task({...req.body, userId:req.userId});
    const savedTask=await newTask.save();
    res.json(savedTask);
});

router.put('/:id', async(req, res)=>{
    const updatedTask=await Task.findbyIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updatedTask);
});

router.delete('/:id', async(req, res)=>{
await Task.findbyIdAndDelete(req.params.id);
res.json({message: 'Task deleted'});
});

export default router;