import express from'express';
const app = express();
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import router  from './routes/authroute.js'
import connectDB from './database/connection.js'
app.use(cors())
app.use(express.json());
const server=http.createServer(app)

//connecting database
connectDB()
// app.get('/',(req, res) =>{
//       return res.status(200).json({ success: "response from get api" })
//  })


const port = process.env.PORT || 5000;
//listening to server
server.listen(port, () => { console.log(`server run at ${port}`) })
app.use(router)

