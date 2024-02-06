import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sendMailToUsers } from './utils/cron.js'

import userRoute from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute);

mongoose.connect(process.env.DBURL).then(() => {
    console.log("db connected");
}).catch(() => {
    console.log("database error");
});

sendMailToUsers();
app.listen(process.env.PORT, () => {
    console.log(`sever is running on port ${process.env.PORT}`);
})