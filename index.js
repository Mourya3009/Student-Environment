import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import db from "./config/mongoose-connection.js";
import homeRouter from "./routes/home.js"
import isLoggedin from './middlewares/isLoggedin.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use("/",homeRouter)

app.listen(3000,()=>{
    console.log("listening on port 3000: http://localhost:3000");
});