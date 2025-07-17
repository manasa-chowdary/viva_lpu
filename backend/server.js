import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI )
.then(()=> console.log('MongoDb Connected'))
.catch(err => console.error(err));

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res)=> res.send('API running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
