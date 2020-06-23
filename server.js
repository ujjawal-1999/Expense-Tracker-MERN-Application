const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors  = require('cors');

// dotenv config
dotenv.config({path:'./config/config.env'});

// Mongoose Connection
const connectDB = require('./config/db');
connectDB();

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',express.static(path.join(__dirname,'/client/build')));
app.use(cors());

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// Router Config
app.use('/api/v1/transactions',require('./routes/transactions'));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/','index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server up and running in ${process.env.NODE_ENV} on port : ${PORT}`.yellow.bold);
})